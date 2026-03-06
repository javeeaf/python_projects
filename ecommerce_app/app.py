import sqlite3
import os
from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# Keep this secret in a real app
app.secret_key = 'super_secret_ecom_key'
DATABASE = 'ecommerce.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Make sure DB exists or tell user to run init_db.py
if not os.path.exists(DATABASE):
    print("WARNING: Databse not found. Please run 'python init_db.py' first.")

@app.context_processor
def inject_cart_count():
    """Inject cart count into all templates so the navbar icon updates."""
    count = 0
    if 'user_id' in session:
        conn = get_db_connection()
        result = conn.execute('SELECT SUM(quantity) as total FROM cart_items WHERE user_id = ?', (session['user_id'],)).fetchone()
        conn.close()
        if result and result['total']:
            count = result['total']
    return dict(cart_count=count)

# --- ROUTES ---

@app.route('/')
def home():
    search_query = request.args.get('search', '').strip()
    category_filter = request.args.get('category', '').strip()
    
    conn = get_db_connection()
    
    # Get all distinct categories for the sidebar/dropdown
    categories = [row['category'] for row in conn.execute('SELECT DISTINCT category FROM products').fetchall()]
    
    query = 'SELECT * FROM products WHERE 1=1'
    params = []
    
    if search_query:
        query += ' AND name LIKE ?'
        params.append(f'%{search_query}%')
        
    if category_filter:
        query += ' AND category = ?'
        params.append(category_filter)
        
    products = conn.execute(query, params).fetchall()
    conn.close()
    
    return render_template('index.html', products=products, categories=categories, current_search=search_query, current_category=category_filter)

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    conn = get_db_connection()
    product = conn.execute('SELECT * FROM products WHERE id = ?', (product_id,)).fetchone()
    conn.close()
    if product is None:
        flash('Product not found.', 'error')
        return redirect(url_for('home'))
    return render_template('product_detail.html', product=product)

@app.route('/cart')
def view_cart():
    if 'user_id' not in session:
        flash('Please log in to view your cart.', 'error')
        return redirect(url_for('login'))
        
    conn = get_db_connection()
    cart_items = conn.execute('''
        SELECT c.id as cart_id, c.quantity, p.id as product_id, p.name, p.price, p.image_url 
        FROM cart_items c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    ''', (session['user_id'],)).fetchall()
    
    total = sum(item['price'] * item['quantity'] for item in cart_items)
    conn.close()
    
    return render_template('cart.html', cart_items=cart_items, total=total)

@app.route('/add_to_cart/<int:product_id>', methods=['POST'])
def add_to_cart(product_id):
    if 'user_id' not in session:
        flash('Please log in to add items to your cart.', 'error')
        return redirect(url_for('login'))
        
    conn = get_db_connection()
    existing_item = conn.execute('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', 
                                 (session['user_id'], product_id)).fetchone()
    
    if existing_item:
        conn.execute('UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?', (existing_item['id'],))
    else:
        conn.execute('INSERT INTO cart_items (user_id, product_id) VALUES (?, ?)', 
                     (session['user_id'], product_id))
                     
    conn.commit()
    conn.close()
    flash('Item added to cart!', 'success')
    return redirect(request.referrer or url_for('home'))

@app.route('/remove_from_cart/<int:cart_id>', methods=['POST'])
def remove_from_cart(cart_id):
    if 'user_id' not in session:
        return redirect(url_for('login'))
        
    conn = get_db_connection()
    conn.execute('DELETE FROM cart_items WHERE id = ? AND user_id = ?', (cart_id, session['user_id']))
    conn.commit()
    conn.close()
    flash('Item removed from cart.', 'success')
    return redirect(url_for('view_cart'))

@app.route('/checkout', methods=['POST'])
def checkout():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    # Ensure cart is not empty before checking out
    conn = get_db_connection()
    count = conn.execute('SELECT COUNT(*) FROM cart_items WHERE user_id = ?', (session['user_id'],)).fetchone()[0]
    conn.close()
    
    if count == 0:
        flash('Your cart is empty. Please add items before checking out.', 'error')
        return redirect(url_for('home'))
        
    return render_template('checkout.html')

@app.route('/process_order', methods=['POST'])
def process_order():
    if 'user_id' not in session:
        return redirect(url_for('login'))
        
    fullname = request.form.get('fullname')
    address = request.form.get('address')
    
    if not fullname or not address:
        flash('Please fill out all delivery details.', 'error')
        return redirect(url_for('checkout'))
        
    # Simulate order processing and clear cart
    conn = get_db_connection()
    conn.execute('DELETE FROM cart_items WHERE user_id = ?', (session['user_id'],))
    conn.commit()
    conn.close()
    
    # In a real app we would save the order details to an 'orders' table
    flash(f'Order placed successfully, {fullname}! It will be shipped to {address}.', 'success')
    return redirect(url_for('home'))

# --- ADMIN ROUTES ---

def is_admin():
    if 'user_id' not in session:
        return False
    conn = get_db_connection()
    user = conn.execute('SELECT is_admin FROM users WHERE id = ?', (session['user_id'],)).fetchone()
    conn.close()
    return user and user['is_admin'] == 1

@app.route('/admin')
def admin_dashboard():
    if not is_admin():
        flash('Access denied. Administrator privileges required.', 'error')
        return redirect(url_for('home'))
        
    conn = get_db_connection()
    products = conn.execute('SELECT * FROM products').fetchall()
    users_count = conn.execute('SELECT COUNT(*) FROM users').fetchone()[0]
    conn.close()
    
    return render_template('admin.html', products=products, users_count=users_count)

@app.route('/admin/add_product', methods=['POST'])
def admin_add_product():
    if not is_admin():
        return redirect(url_for('home'))
        
    name = request.form['name']
    category = request.form.get('category', 'General')
    price = request.form['price']
    desc = request.form['description']
    image_url = request.form.get('image_url', 'https://via.placeholder.com/500')
    
    conn = get_db_connection()
    conn.execute('INSERT INTO products (name, category, description, price, image_url) VALUES (?, ?, ?, ?, ?)',
                 (name, category, desc, float(price), image_url))
    conn.commit()
    conn.close()
    
    flash('New product added to the catalog!', 'success')
    return redirect(url_for('admin_dashboard'))

# --- AUTHENTICATION ROUTES ---

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        
        conn = get_db_connection()
        try:
            conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
            conn.commit()
            flash('Registration successful! Please log in.', 'success')
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Username already exists.', 'error')
        finally:
            conn.close()
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
        conn.close()
        
        if user and check_password_hash(user['password'], password):
            session['user_id'] = user['id']
            session['username'] = user['username']
            session['is_admin'] = user['is_admin'] == 1
            flash(f'Welcome back, {username}!', 'success')
            
            if user['is_admin'] == 1:
                return redirect(url_for('admin_dashboard'))
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password.', 'error')
            
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out.', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True, port=5001)
