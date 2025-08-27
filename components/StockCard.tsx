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
    
    if (isNotFound) {
      return (
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🔍</div>
              <div>
                <h2 className="text-xl font-bold text-white">Stock Not Found</h2>
                <p className="text-blue-100 text-sm">Let's help you find what you're looking for</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {error}
                </p>
              </div>
            </div>
            
            {/* Helpful Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Suggestions */}
              <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-blue-500">💡</span>
                  How to Find Stocks
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Use correct ticker symbols (e.g., <strong>AAPL</strong> for Apple)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Check if the company is publicly traded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Some international stocks may not be available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Try searching for the company name first</span>
                  </li>
                </ul>
              </div>
              
              {/* Popular Stocks */}
              <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-green-500">📈</span>
                  Popular Stocks to Try
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX'].map(symbol => (
                    <button 
                      key={symbol}
                      onClick={() => handleStockClick(symbol)}
                      className="px-3 py-2 text-sm bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 rounded-lg border border-blue-200 transition-all duration-200 font-medium"
                    >
                      {symbol}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Click any symbol above to see real-time data
                </p>
              </div>
            </div>
            
            {/* Additional Help */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <span>ℹ️</span>
                Need More Help?
              </h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• <strong>New to stocks?</strong> Start with popular companies like Apple (AAPL) or Google (GOOGL)</p>
                <p>• <strong>Looking for a specific company?</strong> Search for their official ticker symbol</p>
                <p>• <strong>Data not available?</strong> Some stocks may have limited data or be delisted</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Regular error (not stock not found)
    return (
      <div className="p-6 mt-4 border border-red-300 rounded-xl shadow bg-red-50">
        <div className="flex items-start gap-3">
          <div className="text-red-600 mt-0.5">⚠️</div>
          <div className="flex-1">
            <p className="text-red-700 font-medium mb-2">Error</p>
            <p className="text-red-600 text-sm mb-3">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!stockData) {
    return (
      <div className="space-y-6">
        {/* Welcome/Empty State Card */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📈</div>
              <div>
                <h2 className="text-xl font-bold text-white">Welcome to Stock Calculator</h2>
                <p className="text-green-100 text-sm">Get real-time stock quotes, P/E ratios, and comprehensive financial metrics</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* What You'll Get */}
            <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-green-500">🚀</span>
                What You'll Get
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-2 text-green-700">📊 Real-time Data:</p>
                  <ul className="space-y-1">
                    <li>• Current price & daily change</li>
                    <li>• Volume & trading range</li>
                    <li>• 52-week high/low</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2 text-green-700">💰 Financial Metrics:</p>
                  <ul className="space-y-1">
                    <li>• P/E ratio & EPS</li>
                    <li>• Market capitalization</li>
                    <li>• Dividend yield & beta</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Quick Start */}
            <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-blue-500">💡</span>
                Quick Start
              </h3>
              <p className="text-gray-600 mb-4">Try searching for popular stocks:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX'].map(symbol => (
                  <button 
                    key={symbol}
                    onClick={() => handleStockClick(symbol)}
                    className="px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 rounded-lg border border-green-200 transition-all duration-200 font-medium"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick Tips */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <span>💡</span>
                Quick Tips
              </h4>
              <div className="text-sm text-green-700 space-y-1">
                <p>• <strong>Use ticker symbols</strong> (e.g., AAPL for Apple Inc.)</p>
                <p>• <strong>Press Enter</strong> or click Search to get data</p>
                <p>• <strong>Click any stock above</strong> for instant results</p>
                <p>• <strong>Data updates in real-time</strong> from Alpha Vantage</p>
              </div>
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
