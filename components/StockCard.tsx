"use client";
import { useStockStore } from "../store/stockStore";
import axios from "axios";

export default function StockCard() {
  const { stockData, isLoading, error, setQuery, setStockData, setIsLoading, setError } = useStockStore();

  const handleStockClick = async (symbol: string) => {
    setQuery(symbol);
    setIsLoading(true);
    setError(null);
    setStockData(null);

    try {
      const res = await axios.get(`/api/stocks?query=${symbol}`);
      setStockData(res.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Failed to fetch stock data";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 mt-4 border rounded-xl shadow bg-white animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    const isNotFound = error.includes("No results found") || error.includes("appears to be invalid");
    
    return (
      <div className={`p-6 mt-4 border rounded-xl shadow ${isNotFound ? 'border-orange-300 bg-orange-50' : 'border-red-300 bg-red-50'}`}>
        <div className="flex items-start gap-3">
          <div className={`${isNotFound ? 'text-orange-500' : 'text-red-600'} mt-0.5`}>
            {isNotFound ? '🔍' : '⚠️'}
          </div>
          <div className="flex-1">
            <p className={`${isNotFound ? 'text-orange-700' : 'text-red-700'} font-medium mb-2`}>
              {isNotFound ? 'Stock Not Found' : 'Error'}
            </p>
            <p className={`${isNotFound ? 'text-orange-600' : 'text-red-600'} text-sm mb-3`}>
              {error}
            </p>
            {isNotFound && (
              <div className="mt-3">
                <p className="text-orange-600 text-sm font-medium mb-2">💡 Suggestions:</p>
                <ul className="text-orange-600 text-sm space-y-1">
                  <li>• Make sure you're using the correct ticker symbol (e.g., AAPL for Apple)</li>
                  <li>• Try popular stocks: AAPL, GOOGL, MSFT, TSLA, AMZN, META, NVDA</li>
                  <li>• Check if the company is publicly traded</li>
                  <li>• Some international stocks may not be available</li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-sm text-orange-600">Quick try:</span>
                  {['AAPL', 'GOOGL', 'MSFT'].map(symbol => (
                    <button 
                      key={symbol}
                      onClick={() => handleStockClick(symbol)}
                      className="px-2 py-1 text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 rounded transition-colors"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!stockData) {
    return (
      <div className="space-y-6">
        {/* Welcome/Empty State Card */}
        <div className="p-8 border rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Stock Calculator</h2>
            <p className="text-gray-600 mb-6">
              Search for any stock symbol above to get instant P/E ratios, financial metrics, and professional analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Popular Stocks */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                🔥 Popular Stocks to Try
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleStockClick('AAPL')}
                  className="w-full flex justify-between items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div>
                    <span className="font-medium text-blue-600">AAPL</span>
                    <span className="text-gray-500 ml-2">Apple Inc.</span>
                  </div>
                  <span className="text-sm text-gray-500">Tech Giant</span>
                </button>
                <button 
                  onClick={() => handleStockClick('GOOGL')}
                  className="w-full flex justify-between items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div>
                    <span className="font-medium text-blue-600">GOOGL</span>
                    <span className="text-gray-500 ml-2">Alphabet</span>
                  </div>
                  <span className="text-sm text-gray-500">Search & AI</span>
                </button>
                <button 
                  onClick={() => handleStockClick('TSLA')}
                  className="w-full flex justify-between items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div>
                    <span className="font-medium text-blue-600">TSLA</span>
                    <span className="text-gray-500 ml-2">Tesla Inc.</span>
                  </div>
                  <span className="text-sm text-gray-500">EV Leader</span>
                </button>
                <button 
                  onClick={() => handleStockClick('MSFT')}
                  className="w-full flex justify-between items-center py-3 px-4 border-b border-gray-100 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div>
                    <span className="font-medium text-blue-600">MSFT</span>
                    <span className="text-gray-500 ml-2">Microsoft</span>
                  </div>
                  <span className="text-sm text-gray-500">Software</span>
                </button>
                <button 
                  onClick={() => handleStockClick('NVDA')}
                  className="w-full flex justify-between items-center py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors text-left"
                >
                  <div>
                    <span className="font-medium text-blue-600">NVDA</span>
                    <span className="text-gray-500 ml-2">NVIDIA</span>
                  </div>
                  <span className="text-sm text-gray-500">AI Chips</span>
                </button>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                ✨ What You'll Get
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="text-green-500 mt-0.5">📈</div>
                  <div>
                    <div className="font-medium text-gray-700">P/E Ratio Analysis</div>
                    <div className="text-sm text-gray-500">See if stocks are overvalued/undervalued</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 mt-0.5">💰</div>
                  <div>
                    <div className="font-medium text-gray-700">Financial Metrics</div>
                    <div className="text-sm text-gray-500">Market cap, EPS, Beta, dividends</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-purple-500 mt-0.5">🧮</div>
                  <div>
                    <div className="font-medium text-gray-700">Visual Calculations</div>
                    <div className="text-sm text-gray-500">See exactly how P/E ratios work</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-orange-500 mt-0.5">📊</div>
                  <div>
                    <div className="font-medium text-gray-700">Smart Analysis</div>
                    <div className="text-sm text-gray-500">Automatic insights and trends</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-teal-500 mt-0.5">⚡</div>
                  <div>
                    <div className="font-medium text-gray-700">Real-Time Data</div>
                    <div className="text-sm text-gray-500">Live market data from Alpha Vantage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-800 mb-2">💡 Quick Tips</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• <strong>Click the stocks above</strong> to try them instantly</div>
              <div>• Use stock ticker symbols (AAPL, GOOGL, MSFT)</div>
              <div>• Search works for most US-listed companies</div>
              <div>• P/E ratios help identify value vs growth stocks</div>
              <div>• High P/E (&gt;25) = Growth expectations, Low P/E (&lt;15) = Value opportunity</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to format values
  const formatValue = (value: string | null | undefined, prefix: string = "", suffix: string = "") => {
    if (!value || value === "0" || value === "0.00" || value === "None" || value === "N/A") {
      return "N/A";
    }
    return `${prefix}${value}${suffix}`;
  };

  const formatPercentage = (value: string | null | undefined) => {
    if (!value || value === "0" || value === "0.00" || value === "None") {
      return "N/A";
    }
    return value.includes("%") ? value : `${value}%`;
  };

  const changeColor = stockData.change && parseFloat(stockData.change) >= 0 ? "text-green-600" : "text-red-600";
  const changeIcon = stockData.change && parseFloat(stockData.change) >= 0 ? "📈" : "📉";

  return (
    <div className="space-y-6">
      {/* Main Stock Info Card */}
      <div className="p-6 border rounded-xl shadow-lg bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{stockData.symbol}</h2>
            <p className="text-lg text-gray-600">{stockData.name || stockData.symbol}</p>
            {(stockData.sector || stockData.industry) && (
              <p className="text-sm text-gray-500">
                {stockData.sector || "Unknown Sector"} • {stockData.industry || "Unknown Industry"}
              </p>
            )}
          </div>
          <span className="text-sm text-gray-500">{stockData.latestTradingDay}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price Information */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Price:</span>
              <span className="text-2xl font-bold text-gray-800">{formatValue(stockData.price, "$")}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Change:</span>
              {stockData.change && stockData.changePercent ? (
                <div className={`flex items-center ${changeColor} font-semibold`}>
                  <span className="mr-1">{changeIcon}</span>
                  <span>{formatValue(stockData.change, "$")} ({formatPercentage(stockData.changePercent)})</span>
                </div>
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Open:</span>
              <span className="font-medium">{formatValue(stockData.open, "$")}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Volume:</span>
              <span className="font-medium">
                {stockData.volume && stockData.volume !== "0" ? parseInt(stockData.volume).toLocaleString() : "N/A"}
              </span>
            </div>
          </div>

          {/* Daily Range & 52-Week Range */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Day High:</span>
              <span className="font-medium text-green-600">{formatValue(stockData.high, "$")}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Day Low:</span>
              <span className="font-medium text-red-600">{formatValue(stockData.low, "$")}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">52W High:</span>
              <span className="font-medium text-green-600">{formatValue(stockData.week52High, "$")}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">52W Low:</span>
              <span className="font-medium text-red-600">{formatValue(stockData.week52Low, "$")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Metrics Card */}
      {(stockData.peRatio || stockData.marketCap || stockData.eps || stockData.dividendYield) && (
        <div className="p-6 border rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            📊 Financial Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">P/E Ratio</div>
              <div className={`text-2xl font-bold ${stockData.peRatio ? 'text-blue-600' : 'text-gray-400'}`}>
                {formatValue(stockData.peRatio)}
              </div>
              <div className="text-xs text-gray-500">Price to Earnings</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">EPS</div>
              <div className={`text-2xl font-bold ${stockData.eps ? 'text-green-600' : 'text-gray-400'}`}>
                {formatValue(stockData.eps, "$")}
              </div>
              <div className="text-xs text-gray-500">Earnings per Share</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Market Cap</div>
              <div className={`text-2xl font-bold ${stockData.marketCap ? 'text-purple-600' : 'text-gray-400'}`}>
                {formatValue(stockData.marketCap, "$")}
              </div>
              <div className="text-xs text-gray-500">Market Capitalization</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Dividend Yield</div>
              <div className={`text-2xl font-bold ${stockData.dividendYield ? 'text-orange-600' : 'text-gray-400'}`}>
                {formatValue(stockData.dividendYield)}
              </div>
              <div className="text-xs text-gray-500">Annual Dividend</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Beta</div>
              <div className={`text-2xl font-bold ${stockData.beta ? 'text-red-600' : 'text-gray-400'}`}>
                {formatValue(stockData.beta)}
              </div>
              <div className="text-xs text-gray-500">Market Risk</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Book Value</div>
              <div className={`text-2xl font-bold ${stockData.bookValue ? 'text-teal-600' : 'text-gray-400'}`}>
                {formatValue(stockData.bookValue, "$")}
              </div>
              <div className="text-xs text-gray-500">Book Value per Share</div>
            </div>
          </div>
          
          {/* P/E Ratio Calculation */}
          {stockData.peRatio && stockData.eps && stockData.peRatio !== "N/A" && stockData.eps !== "N/A" ? (
            <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-800 mb-3">🧮 P/E Ratio Calculation</h4>
              
              {/* Calculation Formula */}
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <div className="text-sm font-mono text-gray-700 mb-2">
                  <span className="font-semibold">Formula:</span> P/E Ratio = Current Price ÷ Earnings Per Share (EPS)
                </div>
                
                <div className="flex items-center justify-center text-lg font-mono bg-white p-3 rounded border">
                  <span className="text-blue-600 font-bold">${stockData.price}</span>
                  <span className="mx-3 text-gray-500">÷</span>
                  <span className="text-green-600 font-bold">${stockData.eps}</span>
                  <span className="mx-3 text-gray-500">=</span>
                  <span className="text-purple-600 font-bold">{stockData.peRatio}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-2 text-xs text-center text-gray-600">
                  <div>Current Stock Price</div>
                  <div>Earnings Per Share</div>
                  <div>P/E Ratio Result</div>
                </div>
              </div>

              {/* Calculation Details */}
              <div className="text-sm text-gray-600 mb-2">
                <strong>Calculation Breakdown:</strong>
                <div className="ml-4 mt-1">
                  • Current price per share: <span className="font-medium text-blue-600">${stockData.price}</span>
                  • Annual earnings per share: <span className="font-medium text-green-600">${stockData.eps}</span>
                  • Result: It takes <span className="font-bold text-purple-600">{stockData.peRatio} years</span> of current earnings to equal the stock price
                </div>
              </div>

              {/* Quick Analysis */}
              <div className="text-sm border-t pt-2">
                {parseFloat(stockData.peRatio) > 25 && (
                  <span className="text-red-600">⚠️ High P/E: Investors paying premium, expecting high future growth</span>
                )}
                {parseFloat(stockData.peRatio) >= 15 && parseFloat(stockData.peRatio) <= 25 && (
                  <span className="text-green-600">✅ Moderate P/E: Reasonable valuation relative to earnings</span>
                )}
                {parseFloat(stockData.peRatio) < 15 && (
                  <span className="text-blue-600">💡 Low P/E: Potentially undervalued or lower growth expectations</span>
                )}
              </div>
            </div>
          ) : (
            stockData.peRatio === "N/A" || stockData.eps === "N/A" ? (
              <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-gray-300">
                <h4 className="font-semibold text-gray-600 mb-2">📊 P/E Ratio Information</h4>
                <div className="text-sm text-gray-500">
                  P/E ratio calculation not available for this stock. This could be because:
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>• The company has negative earnings</li>
                    <li>• Earnings data is not yet available</li>
                    <li>• The stock is newly listed</li>
                    <li>• Data is currently being updated</li>
                  </ul>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
