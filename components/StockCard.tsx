"use client";
import { useStockStore } from "../store/stockStore";

export default function StockCard() {
  const { stockData, isLoading, error } = useStockStore();

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
    return (
      <div className="p-4 mt-4 border border-red-300 rounded-xl shadow bg-red-50">
        <div className="flex items-center">
          <div className="text-red-600 mr-2">⚠️</div>
          <p className="text-red-700 font-medium">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!stockData) return null;

  const changeColor = parseFloat(stockData.change) >= 0 ? "text-green-600" : "text-red-600";
  const changeIcon = parseFloat(stockData.change) >= 0 ? "📈" : "📉";

  return (
    <div className="space-y-6">
      {/* Main Stock Info Card */}
      <div className="p-6 border rounded-xl shadow-lg bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{stockData.symbol}</h2>
            <p className="text-lg text-gray-600">{stockData.name}</p>
            {stockData.sector && (
              <p className="text-sm text-gray-500">
                {stockData.sector} • {stockData.industry}
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
              <span className="text-2xl font-bold text-gray-800">${stockData.price}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Change:</span>
              <div className={`flex items-center ${changeColor} font-semibold`}>
                <span className="mr-1">{changeIcon}</span>
                <span>${stockData.change} ({stockData.changePercent}%)</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Open:</span>
              <span className="font-medium">${stockData.open}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Volume:</span>
              <span className="font-medium">{parseInt(stockData.volume).toLocaleString()}</span>
            </div>
          </div>

          {/* Daily Range & 52-Week Range */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Day High:</span>
              <span className="font-medium text-green-600">${stockData.high}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Day Low:</span>
              <span className="font-medium text-red-600">${stockData.low}</span>
            </div>
            
            {stockData.week52High && (
              <div className="flex justify-between">
                <span className="text-gray-600">52W High:</span>
                <span className="font-medium text-green-600">${stockData.week52High}</span>
              </div>
            )}
            
            {stockData.week52Low && (
              <div className="flex justify-between">
                <span className="text-gray-600">52W Low:</span>
                <span className="font-medium text-red-600">${stockData.week52Low}</span>
              </div>
            )}
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
            {stockData.peRatio && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 mb-1">P/E Ratio</div>
                <div className="text-2xl font-bold text-blue-600">{stockData.peRatio}</div>
                <div className="text-xs text-gray-500">Price to Earnings</div>
              </div>
            )}
            
            {stockData.eps && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 mb-1">EPS</div>
                <div className="text-2xl font-bold text-green-600">${stockData.eps}</div>
                <div className="text-xs text-gray-500">Earnings per Share</div>
              </div>
            )}
            
            {stockData.marketCap && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Market Cap</div>
                <div className="text-2xl font-bold text-purple-600">${stockData.marketCap}</div>
                <div className="text-xs text-gray-500">Market Capitalization</div>
              </div>
            )}
            
            {stockData.dividendYield && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Dividend Yield</div>
                <div className="text-2xl font-bold text-orange-600">{stockData.dividendYield}</div>
                <div className="text-xs text-gray-500">Annual Dividend</div>
              </div>
            )}
            
            {stockData.beta && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Beta</div>
                <div className="text-2xl font-bold text-red-600">{stockData.beta}</div>
                <div className="text-xs text-gray-500">Market Risk</div>
              </div>
            )}
            
            {stockData.bookValue && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Book Value</div>
                <div className="text-2xl font-bold text-teal-600">${stockData.bookValue}</div>
                <div className="text-xs text-gray-500">Book Value per Share</div>
              </div>
            )}
          </div>
          
          {/* P/E Ratio Calculation */}
          {stockData.peRatio && stockData.eps && (
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
          )}
        </div>
      )}
    </div>
  );
}
