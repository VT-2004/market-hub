import { MarketCard } from "@/components/MarketCard";
import { useBinanceMarketStats } from "@/hooks/useBinanceData";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LiveMarketStats = () => {
  const { data: marketStats, isLoading, error } = useBinanceMarketStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg bg-gradient-card border border-border">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load market data. Please check your connection and try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!marketStats) return null;

  const marketOverview = [
    {
      title: "Bitcoin Price",
      value: `$${marketStats.btcPrice.toLocaleString()}`,
      change: `${marketStats.btcChange.toFixed(2)}%`,
      isPositive: marketStats.btcChange > 0,
      subtitle: "BTC/USDT"
    },
    {
      title: "Ethereum Price", 
      value: `$${marketStats.ethPrice.toLocaleString()}`,
      change: `${marketStats.ethChange.toFixed(2)}%`,
      isPositive: marketStats.ethChange > 0,
      subtitle: "ETH/USDT"
    },
    {
      title: "24h Volume",
      value: `$${(marketStats.totalVolume / 1000000000).toFixed(1)}B`,
      change: `${marketStats.gainers}/${marketStats.losers}`,
      isPositive: marketStats.gainers > marketStats.losers,
      subtitle: "Gainers/Losers"
    },
    {
      title: "Active Pairs",
      value: marketStats.totalPairs.toLocaleString(),
      change: "Live",
      isPositive: true,
      subtitle: "Trading Pairs"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {marketOverview.map((market, index) => (
        <MarketCard key={index} {...market} />
      ))}
    </div>
  );
};