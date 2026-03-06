import tkinter as tk
from tkinter import ttk

class AntigravityApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Antigravity - Advanced Agentic Coding")
        self.root.geometry("800x600")
        self.root.configure(bg="#0f172a") # Dark background
        
        # Main Frame
        main_frame = tk.Frame(root, bg="#0f172a")
        main_frame.pack(expand=True, fill="both", padx=50, pady=50)
        
        # Header
        header = tk.Label(main_frame, text="Welcome to Antigravity", 
                          font=("Segoe UI", 36, "bold"), fg="#38bdf8", bg="#0f172a")
        header.pack(pady=(0, 15))
        
        # Subheader
        subheader = tk.Label(main_frame, 
                             text="Your Powerful Agentic AI Coding Assistant by Google DeepMind", 
                             font=("Segoe UI", 16), fg="#94a3b8", bg="#0f172a")
        subheader.pack(pady=(0, 40))
        
        # Features Section Card
        features_frame = tk.Frame(main_frame, bg="#1e293b", bd=0, highlightthickness=1, highlightbackground="#334155")
        features_frame.pack(fill="both", expand=True)
        
        # Inner padding for features frame
        inner_frame = tk.Frame(features_frame, bg="#1e293b", padx=40, pady=40)
        inner_frame.pack(fill="both", expand=True)
        
        features_title = tk.Label(inner_frame, text="Core Features", 
                                  font=("Segoe UI", 24, "bold"), fg="#f8fafc", bg="#1e293b")
        features_title.pack(anchor="w", pady=(0, 25))
        
        features = [
            "🚀 Autonomous Task Execution: Solves complex coding tasks end-to-end.",
            "🧠 Advanced Reasoning: Plans, researches, and implements solutions systematically.",
            "💻 Complete Codebase Awareness: Understands your entire project context.",
            "🔧 Intelligent Debugging: Identifies and fixes errors automatically.",
            "🎨 UI/UX Generation: Designs and builds beautiful, responsive interfaces.",
            "🤖 Agentic Workflows: Manages multi-step processes with tool use and self-correction."
        ]
        
        for feature in features:
            f_frame = tk.Frame(inner_frame, bg="#1e293b")
            f_frame.pack(anchor="w", pady=10)
            
            f_label = tk.Label(f_frame, text=feature, font=("Segoe UI", 14), 
                               fg="#cbd5e1", bg="#1e293b", justify="left")
            f_label.pack(side="left")
            
        # Footer
        footer = tk.Label(main_frame, text="Ready to pair program? Let's build something amazing together.", 
                          font=("Segoe UI", 12, "italic"), fg="#64748b", bg="#0f172a")
        footer.pack(pady=(30, 0))

if __name__ == "__main__":
    root = tk.Tk()
    
    # Center the window on the screen
    window_width = 850
    window_height = 650
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    
    center_x = int(screen_width/2 - window_width / 2)
    center_y = int(screen_height/2 - window_height / 2)
    
    root.geometry(f'{window_width}x{window_height}+{center_x}+{center_y}')
    
    app = AntigravityApp(root)
    root.mainloop()
