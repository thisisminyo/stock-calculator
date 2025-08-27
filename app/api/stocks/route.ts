import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Stock symbol is required" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || "demo";
  const symbol = query.toUpperCase();

  try {
    // Fetch both current quote and company overview data
    const [quoteResponse, overviewResponse] = await Promise.all([
      fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
        { next: { revalidate: 300 } }
      ),
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`,
        { next: { revalidate: 3600 } } // Cache overview data for 1 hour
      )
    ]);

    if (!quoteResponse.ok || !overviewResponse.ok) {
      throw new Error("Failed to fetch stock data");
    }

    const [quoteData, overviewData] = await Promise.all([
      quoteResponse.json(),
      overviewResponse.json()
    ]);
    
    // Check if API returned errors
    if (quoteData["Error Message"] || overviewData["Error Message"]) {
      return NextResponse.json({ error: "Invalid stock symbol" }, { status: 404 });
    }

    if (quoteData["Note"] || overviewData["Note"]) {
      return NextResponse.json({ error: "API rate limit exceeded. Try again later." }, { status: 429 });
    }

    const quote = quoteData["Global Quote"];
    
    if (!quote) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 });
    }

    // Validate that we have essential stock data
    const hasEssentialData = overviewData["Sector"] && 
                            overviewData["Name"] && 
                            overviewData["Sector"] !== "None" && 
                            overviewData["Name"] !== "None" &&
                            overviewData["Sector"] !== "N/A" &&
                            overviewData["Name"] !== "N/A";
    
    // Additional check for invalid/missing company data
    const hasValidCompanyData = overviewData["MarketCapitalization"] && 
                               overviewData["MarketCapitalization"] !== "None" &&
                               overviewData["MarketCapitalization"] !== "N/A";
    
    if (!hasEssentialData || !hasValidCompanyData) {
      return NextResponse.json({ 
        error: `Stock symbol "${symbol}" appears to be invalid or the company may not be publicly traded. Please check the symbol and try again.` 
      }, { status: 404 });
    }

    // Helper function to format numbers
    const formatNumber = (value: string) => {
      if (!value || value === "None" || value === "N/A") return null;
      const num = parseFloat(value);
      if (isNaN(num)) return null;
      return num.toFixed(2);
    };

    const formatMarketCap = (value: string) => {
      if (!value || value === "None" || value === "N/A") return null;
      const num = parseFloat(value);
      if (isNaN(num)) return null;
      if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
      if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
      if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
      return num.toFixed(0);
    };

    // Format the response with both quote and fundamental data
    const stockData = {
      symbol: quote["01. symbol"] || symbol,
      name: overviewData["Name"] || quote["01. symbol"] || symbol,
      price: parseFloat(quote["05. price"] || "0").toFixed(2),
      change: parseFloat(quote["09. change"] || "0").toFixed(2),
      changePercent: parseFloat(quote["10. change percent"]?.replace("%", "") || "0").toFixed(2),
      open: parseFloat(quote["02. open"] || "0").toFixed(2),
      high: parseFloat(quote["03. high"] || "0").toFixed(2),
      low: parseFloat(quote["04. low"] || "0").toFixed(2),
      volume: quote["06. volume"] || "0",
      latestTradingDay: quote["07. latest trading day"] || "N/A",
      // Fundamental data from OVERVIEW
      peRatio: formatNumber(overviewData["PERatio"]),
      marketCap: formatMarketCap(overviewData["MarketCapitalization"]),
      bookValue: formatNumber(overviewData["BookValue"]),
      dividendYield: overviewData["DividendYield"] ? `${(parseFloat(overviewData["DividendYield"]) * 100).toFixed(2)}%` : null,
      eps: formatNumber(overviewData["EPS"]),
      beta: formatNumber(overviewData["Beta"]),
      week52High: formatNumber(overviewData["52WeekHigh"]),
      week52Low: formatNumber(overviewData["52WeekLow"]),
      sector: overviewData["Sector"] || null,
      industry: overviewData["Industry"] || null,
    };

    return NextResponse.json(stockData);
  } catch (error) {
    console.error("Stock API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stock data. Please try again later." },
      { status: 500 }
    );
  }
}
