import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtitle?: string;
}

export const MarketCard = ({ title, value, change, isPositive, subtitle }: MarketCardProps) => {
  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {subtitle && <p className="text-xs text-neutral">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <Badge
            variant="outline"
            className={`flex items-center gap-1 ${
              isPositive
                ? "text-gain border-gain bg-gain/10"
                : "text-loss border-loss bg-loss/10"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};