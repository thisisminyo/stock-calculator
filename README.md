# 📈 Stock Calculator

A modern, real-time stock analysis tool that provides professional-grade financial insights. Get instant P/E ratios, market data, and comprehensive financial metrics for any stock - all in a beautiful, easy-to-use interface.

![Stock Calculator](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?logo=tailwindcss)
![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm)
![Alpha Vantage](https://img.shields.io/badge/API-Alpha%20Vantage-blue)

## 🎬 Demo & Screenshots

<!-- Screenshot placeholders - add when deployed -->
### 📱 **Mobile & Desktop Views**
```
[📱 Mobile Screenshot]    [💻 Desktop Screenshot]
   Coming Soon!              Coming Soon!
```

### 🚀 **Live Demo**
```
🌐 Live Demo: [Your Deployed URL Here]
📂 GitHub: [Your GitHub Repository URL]
```

### 🎯 **Try These Real Examples:**
- **Search "AAPL"** → Apple's P/E 29.2, Market Cap $2.8T, Beta 1.29
- **Search "GOOGL"** → Alphabet's financial metrics, P/E 24.1, Beta 1.1  
- **Search "TSLA"** → Tesla's high P/E 65.4, high volatility Beta 2.29
- **Search "MSFT"** → Microsoft's stable metrics, dividend yield 0.68%

### 🎥 **What You'll Experience:**
1. **Type stock symbol** (e.g., "AAPL") 
2. **See instant results** with loading animation
3. **Visual P/E calculation** showing the math
4. **Professional metrics** in beautiful cards
5. **Smart analysis** telling you if it's overvalued/undervalued

## 💡 What This Project Gives You

### 🎯 **For Investors & Traders**
- **Instant Stock Analysis** - Get P/E ratios, market cap, and key metrics in seconds
- **Smart Valuation Insights** - Automatic analysis tells you if stocks are overvalued/undervalued
- **Professional Data** - Same quality financial data used by investment firms
- **Educational Tool** - Learn how P/E ratios are calculated with visual breakdowns

### 📊 **For Developers**
- **Full-Stack Architecture** - Modern Next.js App Router with TypeScript
- **Real API Integration** - Professional financial data handling
- **State Management** - Clean Zustand implementation
- **Responsive Design** - Beautiful UI that works on all devices

### 🎓 **For Learning**
- **Financial Education** - Understand key investment metrics
- **Code Quality** - Professional development practices
- **API Usage** - Learn to integrate external financial APIs
- **Modern Tech Stack** - Next.js 15, TypeScript, Tailwind CSS 4

## ✨ Features

### 📊 **Real-Time Stock Data**
- Live stock quotes powered by Alpha Vantage API
- Current price, daily change, volume
- 52-week high/low ranges
- Latest trading day information

### 💰 **Financial Analysis**
- **P/E Ratio** with calculation breakdown
- **Market Capitalization** (formatted as B/M/T)
- **Earnings Per Share (EPS)**
- **Dividend Yield** percentage
- **Beta** (volatility measure)
- **Book Value** per share

### 🎯 **Smart Analysis**
- Automatic P/E ratio interpretation
- Visual calculation formula display
- Industry and sector information
- Color-coded financial metrics

### 🎨 **Beautiful UI**
- Responsive design for all devices
- Loading states and error handling
- Gradient backgrounds and modern styling
- Professional financial dashboard layout

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd stock-calc

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Get your free API key from Alpha Vantage
# https://www.alphavantage.co/support/#api-key

# Add your API key to .env.local
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here

# Start development server
pnpm run dev
```

Visit `http://localhost:3000` to see your app!

## 🔧 Tech Stack & Environment

### **Core Technologies**
- **Framework:** Next.js 15 (App Router) - React framework for production
- **Language:** TypeScript - Type-safe JavaScript with IntelliSense
- **Styling:** Tailwind CSS 4 - Utility-first CSS framework
- **State Management:** Zustand - Lightweight state management
- **HTTP Client:** Axios - Promise-based HTTP requests
- **API:** Alpha Vantage - Professional financial data provider

### **Development Environment**
- **Package Manager:** pnpm (Fast, disk space efficient)
- **Node.js:** v18+ required
- **Build Tool:** Next.js built-in (Turbopack for dev)
- **TypeScript:** Strict mode enabled for better code quality
- **Deployment:** Vercel (zero-config deployment)

### **Why These Technologies?**
- **Next.js 15:** Latest features, App Router, built-in optimizations
- **pnpm:** 3x faster installs, saves disk space vs npm
- **TypeScript:** Catch errors at compile time, better IDE support
- **Tailwind CSS 4:** Rapid prototyping, consistent design system
- **Zustand:** Simple state management without Redux complexity

## 📱 Usage

### Search for Stocks
Try these popular stocks:
- **AAPL** - Apple Inc.
- **GOOGL** - Alphabet Inc.
- **MSFT** - Microsoft Corporation
- **TSLA** - Tesla Inc.
- **AMZN** - Amazon.com Inc.
- **META** - Meta Platforms Inc.
- **NVDA** - NVIDIA Corporation

### 📈 Real Examples - What You'll See

#### **Apple Inc. (AAPL) Analysis**
```
📊 Stock Price: $184.50
💰 Market Cap: $2.8T
📈 P/E Ratio: 29.2

🧮 P/E Calculation Breakdown:
$184.50 (Current Price) ÷ $6.31 (EPS) = 29.2
→ Analysis: High P/E - Premium valuation, strong growth expectations
```

#### **Microsoft Corp. (MSFT) Analysis**
```
📊 Stock Price: $412.50
💰 Market Cap: $3.1T
📈 P/E Ratio: 34.8
💵 Dividend Yield: 0.68%
⚡ Beta: 0.88

→ Analysis: Stable tech giant with moderate risk
```

#### **Tesla Inc. (TSLA) Analysis**
```
📊 Stock Price: $248.50
💰 Market Cap: $792B
📈 P/E Ratio: 65.4
⚡ Beta: 2.29

🧮 Visual Calculation:
$248.50 ÷ $3.80 (EPS) = 65.4
→ Analysis: Very high P/E - Growth stock with high volatility
```

### 🎯 P/E Ratio Insights
- **High P/E (>25):** Growth expectations, may be overvalued
- **Moderate P/E (15-25):** Fair valuation relative to earnings  
- **Low P/E (<15):** Value opportunity or declining industry

## 🌐 API Information

### Alpha Vantage API
- **Free Tier:** 500 requests/day, 5 requests/minute
- **Each search uses 2 API calls:** Quote + Company Overview
- **~250 stock searches per day** with free tier

### Get Your API Key
1. Visit [Alpha Vantage API Key Page](https://www.alphavantage.co/support/#api-key)
2. Fill out the simple form
3. Get your free API key instantly
4. Add it to your `.env.local` file

## 📊 Complete Financial Dashboard

Your Stock Calculator provides these professional metrics:

| Metric | What It Shows | Real Example (AAPL) | Why It Matters |
|--------|---------------|---------------------|-----------------|
| **P/E Ratio** | Years of earnings = stock price | 29.2 | Valuation vs growth expectations |
| **Market Cap** | Total company value | $2.8T | Company size and market position |
| **EPS** | Profit per share | $6.31 | Earning power per stock unit |
| **Dividend Yield** | Annual dividend % | 0.50% | Income from holding stock |
| **Beta** | Volatility vs market | 1.29 | Risk level (1.0 = market average) |
| **Book Value** | Net assets per share | $4.38 | Company's accounting value |
| **52W High/Low** | Annual trading range | $199.62 / $164.08 | Price volatility and trends |

### 🎯 **What Users Get:**
- ✅ **Instant Analysis** - No need to calculate manually
- ✅ **Visual Learning** - See exactly how P/E is calculated
- ✅ **Smart Insights** - Automatic over/under valuation alerts
- ✅ **Professional Data** - Same metrics used by Wall Street
- ✅ **Easy Understanding** - Complex finance made simple

## 🛠 Development

### Project Structure
```
stock-calc/
├── app/                    # Next.js App Router
│   ├── api/stocks/        # API route for stock data
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── SearchBar.tsx      # Stock search input
│   └── StockCard.tsx      # Stock data display
├── store/                 # Zustand state management
│   └── stockStore.ts      # Global app state
└── package.json           # Dependencies and scripts
```

### Available Scripts

```bash
# Development server
pnpm run dev

# Development server with network access (same WiFi)
pnpm run dev:network

# Build for production
pnpm run build

# Start production server
pnpm start
```

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_api_key_here
```

## 🚀 Deployment

Deploy to Vercel with one command:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add your API key in Vercel dashboard → Settings → Environment Variables.

Other platforms: Netlify, Railway, Heroku, DigitalOcean App Platform.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Alpha Vantage](https://www.alphavantage.co/) for providing free financial data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Zustand](https://zustand-demo.pmnd.rs/) for simple state management

## 📞 Support

If you have any questions or need help:

1. Check the `API_SETUP.md` for API configuration
2. Read `FINANCIAL_METRICS_UPDATE.md` for feature documentation
3. Open an issue on GitHub
4. Contact the maintainers

---

**Built with ❤️ for financial analysis and education**