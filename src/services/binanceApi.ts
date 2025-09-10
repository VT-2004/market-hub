const BINANCE_BASE_URL = 'https://api.binance.com/api/v3';

export interface BinanceTickerData {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  askPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface BinanceExchangeInfo {
  timezone: string;
  serverTime: number;
  symbols: Array<{
    symbol: string;
    status: string;
    baseAsset: string;
    baseAssetPrecision: number;
    quoteAsset: string;
    quotePrecision: number;
    orderTypes: string[];
    icebergAllowed: boolean;
    ocoAllowed: boolean;
    isSpotTradingAllowed: boolean;
    isMarginTradingAllowed: boolean;
    filters: any[];
    permissions: string[];
  }>;
}

class BinanceService {
  private async fetchWithErrorHandling(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Binance API Error:', error);
      throw error;
    }
  }

  async get24hrTicker(symbol?: string): Promise<BinanceTickerData[]> {
    const url = symbol 
      ? `${BINANCE_BASE_URL}/ticker/24hr?symbol=${symbol}`
      : `${BINANCE_BASE_URL}/ticker/24hr`;
    
    const data = await this.fetchWithErrorHandling(url);
    return Array.isArray(data) ? data : [data];
  }

  async getExchangeInfo(): Promise<BinanceExchangeInfo> {
    const url = `${BINANCE_BASE_URL}/exchangeInfo`;
    return await this.fetchWithErrorHandling(url);
  }

  async getPrice(symbol: string): Promise<{ symbol: string; price: string }> {
    const url = `${BINANCE_BASE_URL}/ticker/price?symbol=${symbol}`;
    return await this.fetchWithErrorHandling(url);
  }

  async getTopCoins(limit: number = 50): Promise<BinanceTickerData[]> {
    const tickers = await this.get24hrTicker();
    
    // Filter for USDT pairs and sort by volume
    const usdtPairs = tickers
      .filter(ticker => 
        ticker.symbol.endsWith('USDT') && 
        parseFloat(ticker.quoteVolume) > 1000000 // Min 1M USDT volume
      )
      .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
      .slice(0, limit);

    return usdtPairs;
  }

  // Get historical klines (candlesticks)
  async getKlines(
    symbol: string,
    interval: string = '1m',
    limit: number = 120,
  ): Promise<{
    openTime: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    closeTime: number;
  }[]> {
    const url = `${BINANCE_BASE_URL}/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const raw = await this.fetchWithErrorHandling(url);
    // Kline array format per Binance API
    return (raw as any[]).map((k) => ({
      openTime: k[0],
      open: parseFloat(k[1]),
      high: parseFloat(k[2]),
      low: parseFloat(k[3]),
      close: parseFloat(k[4]),
      volume: parseFloat(k[5]),
      closeTime: k[6],
    }));
  }

  // Get formatted data for our UI components
  async getFormattedCryptoData() {
    const topCoins = await this.getTopCoins(10);
    
    return topCoins.map(coin => ({
      symbol: coin.symbol.replace('USDT', ''),
      name: this.getFullName(coin.symbol.replace('USDT', '')),
      price: `$${parseFloat(coin.lastPrice).toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 8 
      })}`,
      change: `${parseFloat(coin.priceChangePercent).toFixed(2)}%`,
      isPositive: parseFloat(coin.priceChangePercent) > 0,
      volume: `$${(parseFloat(coin.quoteVolume) / 1000000).toFixed(1)}M`
    }));
  }

  async getMarketStats() {
    const tickers = await this.get24hrTicker();
    const btcData = tickers.find(t => t.symbol === 'BTCUSDT');
    const ethData = tickers.find(t => t.symbol === 'ETHUSDT');
    
    // Calculate total market stats
    const totalVolume = tickers
      .filter(t => t.symbol.endsWith('USDT'))
      .reduce((sum, ticker) => sum + parseFloat(ticker.quoteVolume), 0);

    const gainers = tickers.filter(t => parseFloat(t.priceChangePercent) > 0).length;
    const losers = tickers.filter(t => parseFloat(t.priceChangePercent) < 0).length;

    return {
      btcPrice: btcData ? parseFloat(btcData.lastPrice) : 0,
      btcChange: btcData ? parseFloat(btcData.priceChangePercent) : 0,
      ethPrice: ethData ? parseFloat(ethData.lastPrice) : 0,
      ethChange: ethData ? parseFloat(ethData.priceChangePercent) : 0,
      totalVolume,
      gainers,
      losers,
      totalPairs: tickers.length
    };
  }

  private getFullName(symbol: string): string {
    const coinNames: { [key: string]: string } = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'BNB': 'BNB',
      'SOL': 'Solana',
      'XRP': 'XRP',
      'ADA': 'Cardano',
      'DOGE': 'Dogecoin',
      'AVAX': 'Avalanche',
      'LINK': 'Chainlink',
      'DOT': 'Polkadot',
      'MATIC': 'Polygon',
      'SHIB': 'Shiba Inu',
      'LTC': 'Litecoin',
      'UNI': 'Uniswap',
      'ATOM': 'Cosmos',
      'VET': 'VeChain',
      'FIL': 'Filecoin',
      'TRX': 'TRON',
      'ETC': 'Ethereum Classic',
      'XLM': 'Stellar'
    };
    
    return coinNames[symbol] || symbol;
  }
}

export const binanceService = new BinanceService();