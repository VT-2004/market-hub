import { useQuery } from '@tanstack/react-query';
import { binanceService } from '@/services/binanceApi';

export const useBinanceMarketStats = () => {
  return useQuery({
    queryKey: ['binance-market-stats'],
    queryFn: () => binanceService.getMarketStats(),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
  });
};

export const useBinanceCryptoData = () => {
  return useQuery({
    queryKey: ['binance-crypto-data'],
    queryFn: () => binanceService.getFormattedCryptoData(),
    refetchInterval: 30000,
    staleTime: 25000,
  });
};

export const useBinanceAllCoins = () => {
  return useQuery({
    queryKey: ['binance-all-coins'],
    queryFn: async () => {
      const exchangeInfo = await binanceService.getExchangeInfo();
      return exchangeInfo.symbols
        .filter(symbol => 
          symbol.status === 'TRADING' && 
          symbol.quoteAsset === 'USDT' &&
          symbol.isSpotTradingAllowed
        )
        .map(symbol => ({
          symbol: symbol.symbol,
          baseAsset: symbol.baseAsset,
          quoteAsset: symbol.quoteAsset,
          status: symbol.status
        }))
        .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));
    },
    staleTime: 300000, // 5 minutes - exchange info doesn't change often
  });
};

export const useBinanceTopCoins = (limit: number = 50) => {
  return useQuery({
    queryKey: ['binance-top-coins', limit],
    queryFn: () => binanceService.getTopCoins(limit),
    refetchInterval: 30000,
    staleTime: 25000,
  });
};

export const useBinanceKlines = (
  symbol: string | undefined,
  interval: string = '1m',
  limit: number = 120,
) => {
  return useQuery({
    queryKey: ['binance-klines', symbol, interval, limit],
    queryFn: () => binanceService.getKlines(symbol as string, interval, limit),
    enabled: Boolean(symbol),
    refetchInterval: 5000,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 4000,
  });
};