import { create } from "zustand";

interface StockData {
  symbol: string;
  name: string;
  price: string;
  change: string;
  changePercent: string;
  open: string;
  high: string;
  low: string;
  volume: string;
  latestTradingDay: string;
  // Fundamental data
  peRatio: string | null;
  marketCap: string | null;
  bookValue: string | null;
  dividendYield: string | null;
  eps: string | null;
  beta: string | null;
  week52High: string | null;
  week52Low: string | null;
  sector: string | null;
  industry: string | null;
}

interface StockState {
  query: string;
  setQuery: (q: string) => void;
  stockData: StockData | null;
  setStockData: (d: StockData | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useStockStore = create<StockState>((set) => ({
  query: "",
  setQuery: (q) => set({ query: q }),
  stockData: null,
  setStockData: (d) => set({ stockData: d }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
}));
