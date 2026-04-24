import os
import subprocess
import time
import webbrowser
import sys

def run_command(command, cwd=None):
    print(f"Running: {command} in {cwd or 'current directory'}")
    return subprocess.Popen(command, shell=True, cwd=cwd)

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(root_dir, "backend")
    frontend_dir = os.path.join(root_dir, "frontend")

    print("🚀 Initializing AI Library Management System...")

    # 1. Install Backend Deps
    print("\n📦 Installing Backend Dependencies...")
    subprocess.run("pip install -r requirements.txt", shell=True, cwd=backend_dir)

    # 2. Seed Database
    print("\n🗄️ Seeding Database...")
    subprocess.run("python seed.py", shell=True, cwd=backend_dir)

    # 3. Install Frontend Deps
    print("\n📦 Installing Frontend Dependencies...")
    subprocess.run("npm install", shell=True, cwd=frontend_dir)

    # 4. Start Backend
    print("\n🔥 Starting Backend (FastAPI)...")
    backend_proc = run_command("uvicorn app.main:app --host 127.0.0.1 --port 8000", cwd=backend_dir)

    # 5. Start Frontend
    print("\n✨ Starting Frontend (Vite)...")
    frontend_proc = run_command("npm run dev", cwd=frontend_dir)

    # 6. Wait and Open Browser
    print("\n🌐 System is launching! Opening browser in 5 seconds...")
    time.sleep(5)
    webbrowser.open("http://localhost:5173")

    print("\n✅ System is LIVE! Press Ctrl+C to stop both servers.")
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Stopping servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Done!")

if __name__ == "__main__":
    main()
