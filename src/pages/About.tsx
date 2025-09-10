import { Navigation } from "@/components/Navigation";
import { Zap, Shield, Globe, BarChart3 } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              About
            </span>
            <br />
            <span className="text-foreground">MarketHub</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Why MarketHub and how to get the most from it
          </p>
        </div>
      </section>

      {/* Why Choose MarketHub */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MarketHub?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Data</h3>
              <p className="text-muted-foreground">
                Instant crypto market updates across major exchanges.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security and high availability.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-muted-foreground">
                Top cryptocurrencies and market movers in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="py-16 px-4 bg-background/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Learn More</h2>
          <div className="space-y-6 text-muted-foreground">
            <div className="rounded-lg border border-border p-5 bg-gradient-card">
              <h3 className="text-xl font-semibold text-foreground mb-2">What you can explore</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Live crypto market movers with price, volume and 24h change</li>
                <li>On-demand mini charts per asset with 1m, 15m, 4h and 1d intervals</li>
                <li>Browse all Binance USDT pairs and open quick charts</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-5 bg-gradient-card">
              <h3 className="text-xl font-semibold text-foreground mb-2">Tips</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Click any asset row to open the mini chart overlay</li>
                <li>Use the interval buttons at the top-right of the panel</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-5 bg-gradient-card">
              <h3 className="text-xl font-semibold text-foreground mb-2">Resources</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li><a className="text-primary hover:underline" href="https://binance-docs.github.io/apidocs/spot/en/" target="_blank" rel="noreferrer">Binance Spot API docs</a></li>
                <li><a className="text-primary hover:underline" href="https://reactrouter.com/" target="_blank" rel="noreferrer">React Router</a> • <a className="text-primary hover:underline" href="https://recharts.org/en-US" target="_blank" rel="noreferrer">Recharts</a></li>
              </ul>
              <p className="text-xs mt-3">Market data is provided as-is for informational purposes only and is not financial advice.</p>
            </div>
          </div>
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

export default About;
