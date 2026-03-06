import sqlite3
import os

DATABASE = 'ecommerce.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    if not os.path.exists(DATABASE):
        print("Initializing database...")
        conn = get_db_connection()
        
        # Create Users Table
        conn.execute('''
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        ''')
        
        # Create Products Table
        conn.execute('''
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                image_url TEXT
            )
        ''')
        
        # Create Cart Table (simplified for simulation)
        conn.execute('''
            CREATE TABLE cart_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER DEFAULT 1,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        ''')
        
        # Insert Dummy Products
        products = [
            ('Premium Wireless Headphones', 'High-quality noise-canceling headphones with 30-hour battery life.', 24999.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'),
            ('Smart Fitness Watch', 'Track your health, workouts, and receive notifications on the go.', 15999.00, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80'),
            ('Mechanical Keyboard', 'Customizable RGB mechanical keyboard for typing and gaming.', 8999.00, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'),
            ('4K Action Camera', 'Capture your adventures in stunning 4K resolution. Waterproof.', 19999.00, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80'),
            ('Portable Bluetooth Speaker', 'Deep bass and 360-degree sound in a compact, waterproof design.', 5499.00, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80'),
            ('Ergonomic Office Chair', 'Breathable mesh back and adjustable lumbar support for all-day comfort.', 29999.00, 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80')
        ]
        
        conn.executemany('INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)', products)
        
        conn.commit()
        conn.close()
        print("Database initialized and populated with dummy products.")
    else:
        print("Database already exists.")

if __name__ == '__main__':
    init_db()
