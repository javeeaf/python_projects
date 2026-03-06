import sqlite3
import os

DATABASE = 'ecommerce.db'

def migrate_db():
    print("Migrating database for advanced features...")
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # 1. Add "is_admin" to users
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT 0")
        print("Added is_admin to users table.")
    except sqlite3.OperationalError:
        print("is_admin already exists in users.")

    # 2. Add "category" to products
    try:
        cursor.execute("ALTER TABLE products ADD COLUMN category TEXT DEFAULT 'General'")
        print("Added category to products table.")
    except sqlite3.OperationalError:
        print("category already exists in products.")

    # 3. Create a default Admin user (password is 'admin')
    from werkzeug.security import generate_password_hash
    admin_pw = generate_password_hash('admin', method='pbkdf2:sha256')
    try:
        cursor.execute("INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)", 
                       ('admin', admin_pw, 1))
        print("Created default admin user: username='admin', password='admin'")
    except sqlite3.IntegrityError:
        print("Admin user already exists.")

    # 4. Update existing products with realistic categories
    categories = {
        'Premium Wireless Headphones': 'Audio',
        'Smart Fitness Watch': 'Wearables',
        'Mechanical Keyboard': 'Accessories',
        '4K Action Camera': 'Electronics',
        'Portable Bluetooth Speaker': 'Audio',
        'Ergonomic Office Chair': 'Furniture'
    }
    
    for name, cat in categories.items():
        cursor.execute("UPDATE products SET category = ? WHERE name = ?", (cat, name))
        
    conn.commit()
    conn.close()
    print("Migration complete!")

if __name__ == '__main__':
    migrate_db()
