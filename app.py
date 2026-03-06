import tkinter as tk
from tkinter import messagebox

def on_button_click():
    # This function runs when the button is clicked
    name = entry.get()
    if name:
        messagebox.showinfo("Greeting", f"Hello, {name}! Welcome to Python GUIs.")
    else:
        messagebox.showwarning("Warning", "Please enter your name!")

# 1. Create the main application window
root = tk.Tk()
root.title("My First Desktop App")
root.geometry("400x250") # Set the width x height

# 2. Create a Label (Text)
label = tk.Label(root, text="Enter your name:", font=("Arial", 14))
label.pack(pady=20) # 'pack' places it in the window, pady adds vertical spacing

# 3. Create an Entry (Text Input Box)
entry = tk.Entry(root, font=("Arial", 14), width=20)
entry.pack(pady=10)

# 4. Create a Button
button = tk.Button(root, text="Click Me!", font=("Arial", 12), command=on_button_click)
button.pack(pady=10)

# 5. Start the application loop (keeps the window open)
root.mainloop()
