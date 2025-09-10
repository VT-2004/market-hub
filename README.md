## MarketHub (Crypto Dashboard)

A fast, modern crypto market dashboard built with React, Vite, TypeScript, Tailwind, and shadcn/ui. It shows live market stats, lets you browse all Binance USDT pairs with search, and opens a compact chart overlay for any coin with selectable intervals.

### Features
- Live overview: BTC/ETH snapshot and market breadth
- All Coins list: searchable Binance USDT pairs (TRADING only)
- Quick chart overlay: 1m / 15m / 4h / 1d (line chart)
- “View All Coins” modal and inline list
- Responsive UI (desktop → mobile)
- Local auth: Register/Login with unique email (stored in localStorage)

### Tech Stack
- React 18 + TypeScript + Vite 5
- Tailwind CSS + shadcn/ui (Radix)
- Recharts (charts)
- TanStack Query (data fetching + caching)

### Project Structure (key files)
```
src/
  components/
    AllCoinsList.tsx       # Inline searchable list of all coins
    AllCoinsModal.tsx      # “View All Coins” modal
    CoinChart.tsx          # Reusable chart panel (line, intervals)
    LiveMarketStats.tsx    # BTC/ETH + market breadth
    LiveCryptoTable.tsx    # Curated crypto movers section
    Navigation.tsx         # Top navigation (Markets, About, Auth)
  hooks/
    useBinanceData.ts      # TanStack Query hooks
  pages/
    Index.tsx              # Home (Markets section)
    About.tsx              # About page
    Login.tsx, Register.tsx# Auth pages (localStorage)
  services/
    binanceApi.ts          # REST calls to Binance
    auth.ts                # Local auth store (users + session)
```

### Getting Started
1) Install Node.js 18+ and npm (or Bun).
2) Install deps:
```
npm install
```
3) Start dev server:
```
npm run dev
```
Vite dev server binds to port 8080 by config. If busy, it may auto-pick the next port.

### Scripts
```
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # run eslint
```

### Configuration
- Vite alias `@` → `src/`
- Ports configured in `vite.config.ts` (default 8080)
- shadcn/ui components live under `src/components/ui`

### Data Sources
- Binance public REST API (spot): 24h tickers, exchange info, klines
  - Docs: https://binance-docs.github.io/apidocs/spot/en/

### Authentication (Local Only)
- Email uniqueness enforced on registration
- Users and session stored in `localStorage` (no backend required)
- Files: `src/services/auth.ts`, `src/pages/Login.tsx`, `src/pages/Register.tsx`

### Deployment
1) Build: `npm run build`
2) Serve the `dist/` folder with any static host (Vercel, Netlify, GitHub Pages, Nginx, etc.)

### Notes
- This demo is crypto-focused. Non-crypto features (forex/futures) were removed for clarity.
- Candlestick charts are not included by default; the line chart is optimized for reliability.

### License
MIT


