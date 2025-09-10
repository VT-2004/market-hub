import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useBinanceAllCoins } from "@/hooks/useBinanceData";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Search, Coins } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CoinChart from "@/components/CoinChart";

export const AllCoinsModal = () => {
  const [search, setSearch] = useState("");
  const { data: allCoins, isLoading, error } = useBinanceAllCoins();
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>();
  const [interval, setInterval] = useState<string>('1m');

  const filteredCoins = allCoins?.filter(coin =>
    coin.baseAsset.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
          <Coins className="h-4 w-4 mr-2" />
          View All Coins ({allCoins?.length || 0})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            All Binance Trading Pairs
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search coins (e.g., BTC, ETH, ADA)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {isLoading && (
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded border">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load coins data. Please try again.
              </AlertDescription>
            </Alert>
          )}

          {allCoins && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filteredCoins.length} of {allCoins.length} trading pairs</span>
              <Badge variant="outline" className="text-primary border-primary/20">
                USDT Pairs Only
              </Badge>
            </div>
          )}

          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredCoins.map((coin) => (
                <div
                  key={coin.symbol}
                  onClick={() => setSelectedSymbol(coin.symbol)}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {coin.baseAsset.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{coin.baseAsset}</div>
                      <div className="text-sm text-muted-foreground">{coin.symbol}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge 
                      variant={coin.status === 'TRADING' ? 'default' : 'secondary'}
                      className={coin.status === 'TRADING' ? 'bg-gain text-gain-foreground' : ''}
                    >
                      {coin.status}
                    </Badge>
                  </div>
                </div>
              ))}
              
              {filteredCoins.length === 0 && allCoins && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No coins found matching "{search}"</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
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
    </>
  );
};