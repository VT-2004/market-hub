import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Asset {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  volume?: string;
}

interface AssetTableProps {
  title: string;
  assets: Asset[];
  onSelect?: (symbol: string) => void;
  selectedSymbol?: string;
  symbolSuffix?: string | null;
}

export const AssetTable = ({ title, assets, onSelect, selectedSymbol, symbolSuffix = 'USDT' }: AssetTableProps) => {
  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {assets.map((asset, index) => (
            <div
              key={index}
              onClick={() => onSelect?.(symbolSuffix ? asset.symbol + symbolSuffix : asset.symbol)}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                selectedSymbol === (symbolSuffix ? asset.symbol + symbolSuffix : asset.symbol) ? 'bg-secondary' : 'bg-secondary/50 hover:bg-secondary'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{asset.symbol}</span>
                  <span className="text-sm text-muted-foreground">{asset.name}</span>
                </div>
                {asset.volume && (
                  <span className="text-xs text-neutral">Vol: {asset.volume}</span>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">{asset.price}</div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    asset.isPositive
                      ? "text-gain border-gain bg-gain/10"
                      : "text-loss border-loss bg-loss/10"
                  }`}
                >
                  {asset.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {asset.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};