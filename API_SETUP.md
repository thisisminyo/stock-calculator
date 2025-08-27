# 🔑 API Setup Instructions

## Getting Your Free Alpha Vantage API Key

Your Stock Calculator now uses **Alpha Vantage** for real-time stock data. Follow these steps to get started:

### 1. Get Your Free API Key
1. Visit [Alpha Vantage API Key Page](https://www.alphavantage.co/support/#api-key)
2. Fill out the simple form with:
   - Your name
   - Your email address  
   - Organization (can be "Personal" or "Student")
3. Click "GET FREE API KEY"
4. You'll receive your API key instantly!

### 2. Set Up Your Environment Variable
1. In your project root (`/stock-calc/`), create a file named `.env.local`
2. Add your API key to the file:
   ```
   NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with the key you received from Alpha Vantage

### 3. Restart Your Development Server
```bash
# Stop the current server (Ctrl+C if running)
# Then restart:
pnpm run dev
```

## 📊 Free Tier Limits

**Alpha Vantage Free Tier includes:**
- ✅ 500 API requests per day
- ✅ 5 requests per minute rate limit
- ✅ Real-time stock quotes
- ✅ Historical data access
- ✅ No credit card required

## 🧪 Testing the Integration

Try searching for these popular stocks:
- **AAPL** - Apple Inc.
- **GOOGL** - Alphabet Inc.
- **MSFT** - Microsoft Corporation  
- **TSLA** - Tesla Inc.
- **AMZN** - Amazon.com Inc.
- **META** - Meta Platforms Inc.
- **NVDA** - NVIDIA Corporation

## 🚨 Troubleshooting

**"API rate limit exceeded" error?**
- You've hit the 5 requests/minute limit
- Wait a minute and try again

**"Invalid stock symbol" error?**
- Make sure you're using the correct ticker symbol
- Try major stocks like AAPL, GOOGL, MSFT first

**"Failed to fetch" error?**
- Check your API key is correctly set in `.env.local`
- Verify the API key is valid on Alpha Vantage

## 💡 Alternative Free APIs (if needed)

If you want to try other free stock APIs:

1. **Finnhub** - 60 calls/minute free
2. **IEX Cloud** - 50,000 messages/month free  
3. **Twelve Data** - 800 requests/day free

## 🎯 What's Included

Your enhanced Stock Calculator now shows:
- 📈 Current stock price
- 📊 Daily change ($ and %)
- 🏢 Open, High, Low prices
- 📊 Trading volume
- 📅 Latest trading day
- 🎨 Beautiful UI with loading states
- ⚡ Error handling and validation

Enjoy your real-time stock data! 🚀
