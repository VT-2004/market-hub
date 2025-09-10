import { AssetTable } from "@/components/AssetTable";
import { useBinanceCryptoData } from "@/hooks/useBinanceData";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Wifi } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import CoinChart from "@/components/CoinChart";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const LiveCryptoTable = () => {
  const { data: cryptoData, isLoading, error, dataUpdatedAt } = useBinanceCryptoData();
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>();
  const [interval, setInterval] = useState<string>('1m');
  

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-20" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
            <div className="text-right">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
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
          Failed to load cryptocurrency data from Binance. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!cryptoData || cryptoData.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No cryptocurrency data available at the moment.
        </AlertDescription>
      </Alert>
    );
  }

  const lastUpdate = new Date(dataUpdatedAt).toLocaleTimeString();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">🚀 Live Cryptocurrencies</h3>
        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10">
          <Wifi className="h-3 w-3 mr-1" />
          Live • {lastUpdate}
        </Badge>
      </div>
      <AssetTable title="" assets={cryptoData} onSelect={(s) => { setSelectedSymbol(s); }} selectedSymbol={selectedSymbol} />
      <Dialog open={Boolean(selectedSymbol)} onOpenChange={(open) => { if (!open) setSelectedSymbol(undefined); }}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
          <CoinChart
            symbol={selectedSymbol}
            interval={interval}
            title="Live Price"
            onIntervalChange={setInterval}
            onClose={() => setSelectedSymbol(undefined)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};