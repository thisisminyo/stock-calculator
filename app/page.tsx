"use client";
import { useState } from "react";
import StockCard from "../components/StockCard";
import { useStockStore } from "../store/stockStore";
import axios from "axios";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setStockData, setIsLoading, setError, isLoading, setQuery } = useStockStore();

  async function handleSearch(queryToSearch = searchQuery) {
    console.log('handleSearch called, query:', queryToSearch, 'isLoading:', isLoading);
    if (!queryToSearch.trim()) {
      console.log('Query is empty, returning early');
      return;
    }
    
    setQuery(queryToSearch); // Update the store with the searched query
    setIsLoading(true);
    setError(null);
    setStockData(null);

    try {
      const res = await axios.get(`/api/stocks?query=${queryToSearch}`);
      setStockData(res.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Check if it's our custom validation error
        const errorMessage = error.response?.data?.error;
        if (errorMessage && errorMessage.includes("appears to be invalid")) {
          setError(errorMessage);
        } else {
          setError(`No results found for "${queryToSearch}". Please check the stock symbol and try again.`);
        }
      } else if (error.response?.status === 429) {
        setError("API rate limit reached. Please wait a moment and try again.");
      } else {
        setError(error.response?.data?.error || "Failed to fetch stock data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim() && !isLoading) {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">📈 Stock Calculator</h1>
          <p className="text-gray-600">Get real-time stock quotes with P/E ratios and financial metrics</p>
          <p className="text-sm text-gray-500">Powered by Alpha Vantage API</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-3">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter stock symbol (AAPL, GOOGL, TSLA, MSFT...)"
              className="w-full p-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
            />
            <button 
              onClick={() => {
                console.log('Button clicked! Query:', searchQuery, 'Trim:', searchQuery.trim(), 'IsLoading:', isLoading);
                handleSearch();
              }} 
              disabled={isLoading || !searchQuery.trim()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </>
              ) : (
                <>
                  🔍 Search
                </>
              )}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-600 mb-2">
              <strong>Quick search:</strong>
              {['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA'].map(symbol => (
                <button 
                  key={symbol}
                  onClick={() => {
                    setSearchQuery(symbol);
                    handleSearch(symbol);
                  }}
                  className="ml-2 px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  {symbol}
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              Or click any stock below to get started instantly 👇
            </div>
          </div>
        </div>

        <StockCard />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>📊 Real-time quotes, P/E ratios, market cap, EPS, and more financial data</p>
          <p className="mt-2">Data provided by Alpha Vantage • Free tier: 500 requests/day</p>
          <p className="mt-1">
            Need an API key? Get one free at{" "}
            <a 
              href="https://www.alphavantage.co/support/#api-key" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Alpha Vantage
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
