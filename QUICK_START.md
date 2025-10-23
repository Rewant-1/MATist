# Quick Start Guide - ECE MATLAB Practical Helper

## ⚡ 5-Minute Setup

### Prerequisites Check
- [ ] Python 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] Gemini API key ready

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies (if not already done)
pip install -r requirements.txt

# Create .env file with your API key
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Start backend
python app.py
```

✅ Backend should be running at `http://localhost:5000`

### Step 2: Frontend Setup (2 minutes)

```bash
# Open new terminal, navigate to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Create .env.local file
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:5000" > .env.local

# Start frontend
npm run dev
```

✅ Frontend should be running at `http://localhost:3000`

### Step 3: Test ECE Helper (1 minute)

1. Open browser: `http://localhost:3000`
2. Click "ECE MATLAB Helper" button (top right)
3. Enter a topic: "Convolution of two signals"
4. Click "Generate"
5. Wait ~30 seconds for complete response
6. Explore tabs: Theory, Basic Code, Optimized Code, Explanation, LaTeX
7. Download LaTeX report!

## 🎯 Test Topics

Copy-paste these to test different capabilities:

**Signal Processing:**
- Convolution of two signals
- Fast Fourier Transform (FFT)
- Discrete Fourier Transform (DFT)

**Filters:**
- FIR Filter Design using windowing method
- IIR Filter Design using bilinear transformation

**Communications:**
- Amplitude Modulation and Demodulation
- Frequency Modulation
- Sampling and Aliasing demonstration

**Basic DSP:**
- Linear and Circular Convolution
- Z-Transform implementation
- Frequency response of digital filters

## 🐛 Quick Troubleshooting

### Backend won't start
- **Error**: `Import "flask" could not be resolved`
  - **Fix**: `pip install -r requirements.txt`

- **Error**: `GEMINI_API_KEY not found`
  - **Fix**: Create `.env` file in `backend/` with your API key

### Frontend won't start
- **Error**: Module not found
  - **Fix**: `npm install` in frontend directory

- **Error**: Cannot connect to backend
  - **Fix**: Check `NEXT_PUBLIC_BACKEND_URL` in `.env.local`
  - **Fix**: Verify backend is running on port 5000

### API errors
- **Error**: Timeout or slow response
  - **Normal**: First request may take 20-40 seconds
  - **Check**: Gemini API key is valid and has quota

### LaTeX report issues
- **Download doesn't work**: Check browser download settings
- **LaTeX won't compile**: Copy content to Overleaf and fix any package issues

## 📊 Expected Response Time

| Operation | Time |
|-----------|------|
| Theory Generation | 5-10 sec |
| Code Generation | 5-10 sec |
| Code Explanation | 5-10 sec |
| Optimization Check | 3-7 sec |
| LaTeX Report | 5-10 sec |
| **Total** | **20-40 sec** |

## 🔍 Verify Installation

Run the test script:

```bash
cd backend
python test_ece_agent.py
```

Expected output:
```
✓ Agent initialized successfully
✓ Theory generated: XXXX characters
✓ Brute-force code generated: XXXX characters
✓ Code explanation generated: XXXX characters
✓ LaTeX report generated: XXXX characters
✓✓✓ TEST PASSED ✓✓✓
```

## 📝 What You Should See

### Theory Tab
- Introduction to the concept
- Fundamental concepts
- Mathematical foundation
- Applications
- Relevance to MATLAB

### Basic Code Tab
- Well-commented MATLAB code
- Simple, brute-force approach
- Step-by-step explanation

### Optimized Code Tab (if applicable)
- Vectorized implementation
- Built-in function usage
- Performance improvements

### LaTeX Report Tab
- Complete `.tex` document
- All sections properly formatted
- Ready to download and compile

## 🎉 Success Indicators

You're ready when:
- ✅ Backend responds at `/api/health`
- ✅ Frontend shows main page without errors
- ✅ ECE page loads at `/ece-practical`
- ✅ Can generate complete practical response
- ✅ Can download LaTeX report
- ✅ Test script passes

## 🚀 Next Steps

1. Try different ECE topics
2. Customize agent prompts if needed
3. Test LaTeX reports in Overleaf
4. Share with ECE students for feedback
5. Deploy to production (optional)

## 📖 Full Documentation

- **Complete Guide**: `ECE_MATLAB_HELPER_GUIDE.md`
- **Project Summary**: `PROJECT_COMPLETION_SUMMARY.md`
- **Implementation Details**: `tasks.md`
- **Architecture**: `README.md`

---

**Happy Learning! 🎓**
