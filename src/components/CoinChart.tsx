import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBinanceKlines } from "@/hooks/useBinanceData";
import { X as CloseIcon } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface CoinChartProps {
  symbol?: string; // e.g., BTCUSDT
  interval: string; // e.g., '1m', '5m', '1h'
  title?: string;
  onIntervalChange?: (interval: string) => void;
  onClose?: () => void;
  invert?: boolean; // Invert OHLC (for USD/JPY using JPYUSDT)
  emptyMessage?: string;
  externalLink?: { href: string; label?: string };
}

export const CoinChart = ({ symbol, interval, title, onIntervalChange, onClose, invert = false, emptyMessage, externalLink }: CoinChartProps) => {
  const { data, isLoading, isError } = useBinanceKlines(symbol, interval, 120);

  const chartData = (data || []).map((k) => {
    if (!invert) {
      return {
        time: new Date(k.closeTime).toLocaleTimeString(),
        open: k.open,
        high: k.high,
        low: k.low,
        close: k.close,
      };
    }
    return {
      time: new Date(k.closeTime).toLocaleTimeString(),
      open: 1 / k.open,
      high: 1 / k.low, // invert high/low swapped
      low: 1 / k.high,
      close: 1 / k.close,
    };
  });

  const last = data && data.length > 0 ? data[data.length - 1] : undefined;
  const prev = data && data.length > 1 ? data[data.length - 2] : undefined;
  const lastClose = last ? (invert ? 1 / last.close : last.close) : undefined;
  const pct = last && prev ? ((last.close - prev.close) / prev.close) * 100 : undefined;

  const intervals = ['1m', '15m', '4h', '1d'];

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg font-semibold text-foreground">
            {title || (symbol ? `${symbol}` : "Select a coin")}
          </CardTitle>
          <div className="flex items-center gap-2">
            {intervals.map((iv) => (
              <Button key={iv} size="sm" variant={iv === interval ? 'default' : 'outline'} onClick={() => onIntervalChange?.(iv)}>
                {iv}
              </Button>
            ))}
            {externalLink && (
              <a href={externalLink.href} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline">{externalLink.label || 'Open'}</Button>
              </a>
            )}
          </div>
        </div>
        {lastClose !== undefined && (
          <div className="text-sm text-muted-foreground mt-2">
            <span className="mr-3">{symbol} • {interval}</span>
            <span className="mr-3">Last: {lastClose.toFixed(6)}</span>
            {pct !== undefined && (
              <span className={pct >= 0 ? 'text-gain' : 'text-loss'}>
                {pct >= 0 ? '+' : ''}{pct.toFixed(2)}%
              </span>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!symbol ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">{emptyMessage || 'No coin selected'}</div>
        ) : isLoading ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">Loading chart…</div>
        ) : (isError || !data || data.length === 0) ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">{emptyMessage || 'No data available'}</div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} minTickGap={24} stroke="#666" />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} stroke="#666" />
                <Tooltip formatter={(v: number) => (typeof v === 'number' ? v.toFixed(6) : v)} labelClassName="text-foreground" contentStyle={{ background: '#0b0b0b', border: '1px solid #222' }} />
                <Line type="monotone" dataKey="close" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoinChart;


