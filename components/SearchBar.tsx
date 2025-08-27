"use client";
import { useStockStore } from "../store/stockStore";

interface SearchBarProps {
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

export default function SearchBar({ onKeyPress }: SearchBarProps) {
  const { query, setQuery } = useStockStore();

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={onKeyPress}
      placeholder="Enter stock symbol (AAPL, GOOGL, TSLA, MSFT...)"
      className="w-full p-3 border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:outline-none transition-colors placeholder-gray-400"
    />
  );
}
