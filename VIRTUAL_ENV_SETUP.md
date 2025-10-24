# Virtual Environment Setup - ECE MATLAB Helper

## ✅ Virtual Environment Successfully Configured!

Your backend is now properly set up with an isolated Python virtual environment. This prevents package conflicts and keeps your dependencies organized.

## 🎯 How to Run the Backend

### Option 1: Using the Startup Script (Easiest)
```powershell
cd backend
.\start.ps1
```

### Option 2: Manual Activation
```powershell
cd backend
.\venv\Scripts\python.exe app.py
```

### Option 3: Activate then Run
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python app.py
```

## 📦 What's in the Virtual Environment?

All Python packages from `requirements.txt` are installed:
- Flask 3.1.1 (Web framework)
- Google Generative AI (Gemini integration)
- Flask-CORS (Cross-origin requests)
- And all dependencies

## 🔄 Managing Dependencies

### Installing New Packages
Always activate the virtual environment first:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install package-name
pip freeze > requirements.txt  # Update requirements
```

### Updating Existing Packages
```powershell
.\venv\Scripts\Activate.ps1
pip install --upgrade package-name
```

### Reinstalling All Dependencies
```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt --upgrade
```

## ⚠️ Important Notes

1. **Always use the virtual environment** when running the backend
2. **Don't delete the `venv/` folder** - it contains all your installed packages
3. **The `venv/` folder is in `.gitignore`** - it won't be committed to Git
4. **Other developers** will create their own `venv/` using `requirements.txt`

## 🚀 Complete Startup Instructions

### First Time Setup
```powershell
# 1. Create virtual environment (already done!)
cd backend
python -m venv venv

# 2. Install dependencies (already done!)
.\venv\Scripts\python.exe -m pip install -r requirements.txt

# 3. Create .env file with your API key
# Add: GEMINI_API_KEY=your_key_here

# 4. Run the backend
.\start.ps1
```

### Every Time After
```powershell
cd backend
.\start.ps1
```

Or use the master startup script from project root:
```powershell
.\start.ps1  # Starts both backend and frontend
```

## ✨ Benefits of Virtual Environment

✅ **Isolation:** Packages don't conflict with system Python  
✅ **Reproducibility:** Same environment across all machines  
✅ **Clean:** Easy to reset by deleting `venv/` and recreating  
✅ **Professional:** Industry best practice  

Your backend is now running with proper Python dependency isolation! 🎉
