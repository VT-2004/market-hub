import { Navigation } from "@/components/Navigation";
import { LiveMarketStats } from "@/components/LiveMarketStats";
import { LiveCryptoTable } from "@/components/LiveCryptoTable";
import { AllCoinsModal } from "@/components/AllCoinsModal";
import { AssetTable } from "@/components/AssetTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Globe, Coins, Zap, Shield } from "lucide-react";
import NotifyMeDialog from "@/components/NotifyMeDialog";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CoinChart from "@/components/CoinChart";
import AllCoinsList from "@/components/AllCoinsList";

const Index = () => {
  // Removed non-crypto placeholders
  
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>();
  const [interval, setInterval] = useState<string>("1m");
  const [panelTitle, setPanelTitle] = useState<string>("Live Price");
  const [invert, setInvert] = useState<boolean>(false);
  const [externalLink, setExternalLink] = useState<{ href: string; label?: string } | undefined>();

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge 
            variant="outline" 
            className="mb-6 text-primary border-primary/20 bg-primary/10"
          >
            <Zap className="h-3 w-3 mr-1" />
            Live Market Data
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              All-in-One Market
            </span>
            <br />
            <span className="text-foreground">Dashboard</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Stay ahead of the market with real-time data on forex pairs, crypto coins, meme tokens, 
            futures, and more — all in one place!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              onClick={() => document.getElementById('markets')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Explore Markets
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/20 text-primary hover:bg-primary/10"
              asChild
            >
              <a href="/about">
                <Shield className="h-4 w-4 mr-2" />
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="py-16 px-4 bg-background/50" id="markets">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Markets</h2>
            <p className="text-muted-foreground">Browse all Binance USDT pairs and open quick charts</p>
          </div>

          {/* Live Overview moved above list */}
          <div className="mb-8">
            <div className="text-center p-8 rounded-lg bg-gradient-card border border-border w-full">
              <Coins className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Live Overview</h3>
              <p className="text-muted-foreground mb-4">Quick snapshot of BTC/ETH and market breadth.</p>
              <LiveMarketStats />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <AllCoinsList onSelect={(symbol) => { setPanelTitle("Live Price"); setSelectedSymbol(symbol); setExternalLink(undefined); setInvert(false); }} />
            </div>
          </div>

          <Dialog open={Boolean(selectedSymbol)} onOpenChange={(open) => { if (!open) setSelectedSymbol(undefined); }}>
            <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
              <CoinChart
                symbol={selectedSymbol}
                interval={interval}
                title={panelTitle}
                onIntervalChange={setInterval}
                onClose={() => setSelectedSymbol(undefined)}
                invert={false}
                emptyMessage={undefined}
                externalLink={undefined}
              />
            </DialogContent>
          </Dialog>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MarketHub
            </span>
          </div>
          <p className="text-muted-foreground">
            Your gateway to global financial markets — simple, intuitive, and always accessible.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;