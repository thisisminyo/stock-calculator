"use client";
import { useStockStore } from "../store/stockStore";

export default function SearchBar() {
  const { query, setQuery } = useStockStore();

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search stock (AAPL, TSLA...)"
      className="w-full p-2 border rounded-xl shadow"
    />
  );
}
