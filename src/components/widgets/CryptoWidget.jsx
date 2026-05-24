import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "./Loader";

const AVAILABLE_COINS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH" },
  { id: "solana", name: "Solana", symbol: "SOL" },
  { id: "ripple", name: "Ripple", symbol: "XRP" },
  { id: "cardano", name: "Cardano", symbol: "ADA" },
  { id: "polkadot", name: "Polkadot", symbol: "DOT" },
];

export default function CryptoWidget() {
  const [showConfig, setShowConfig] = useState(false);
  // Default selection set to show BTC, ETH, and SOL initially
  const [selectedCoins, setSelectedCoins] = useState(["bitcoin", "ethereum", "solana"]);

  // Create a comma-separated query string based on user choice
  const coinQueryString = selectedCoins.join(",");

  // Fetch only the chosen active coins dynamically
  const { data, loading, error, refetch } = useFetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinQueryString || "none"}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
  );

  const toggleCoinSelection = (id) => {
    setSelectedCoins((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderCryptoRow = (coinKey, displayName, symbol) => {
    const coinData = data?.[coinKey];
    if (!coinData) return null;

    const change24h = coinData.usd_24h_change || 0;
    const isPositive = change24h >= 0;

    return (
      <div key={coinKey} style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "4px", 
        paddingBottom: "12px", 
        borderBottom: "1px solid var(--border)" 
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: "600", color: "var(--text-h)" }}>
            {displayName} <span style={{ fontSize: "12px", color: "var(--text)", fontWeight: "normal" }}>{symbol}</span>
          </span>
          <span style={{ fontFamily: "var(--mono)", fontWeight: "600", color: "var(--text-h)" }}>
            ${coinData.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
          <span style={{ color: "var(--text)" }}>Cap: ${(coinData.usd_market_cap / 1e9).toFixed(2)}B</span>
          <span style={{ fontWeight: "600", color: isPositive ? "#22c55e" : "#ef4444" }}>
            {isPositive ? "▲" : "▼"} {Math.abs(change24h).toFixed(2)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Widget Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "15px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "18px", color: "var(--text-h)" }}>Market Assets</h3>
          <p style={{ margin: 0, fontSize: "12px", color: "var(--text)" }}>Custom Watchlist Feed</p>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button 
            onClick={() => setShowConfig(!showConfig)} 
            style={{ padding: "6px 10px", fontSize: "13px", borderRadius: "6px" }}
          >
            {showConfig ? "Done" : "⚙️ Edit"}
          </button>
          {!showConfig && (
            <button onClick={refetch} style={{ padding: "6px 10px", fontSize: "13px", borderRadius: "6px" }}>
              Refresh
            </button>
          )}
        </div>
      </div>

      {/* Configuration Selection Checklist Panel */}
      {showConfig ? (
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "10px", 
          padding: "10px", 
          backgroundColor: "var(--bg)", 
          borderRadius: "8px",
          maxHeight: "320px",
          overflowY: "auto"
        }}>
          <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--text)", marginBottom: "4px" }}>
            Toggle active assets:
          </p>
          {AVAILABLE_COINS.map((coin) => (
            <label key={coin.id} style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "10px", 
              fontSize: "14px", 
              color: "var(--text-h)",
              cursor: "pointer",
              padding: "4px 0"
            }}>
              <input 
                type="checkbox" 
                checked={selectedCoins.includes(coin.id)} 
                onChange={() => toggleCoinSelection(coin.id)}
                style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "var(--accent)" }}
              />
              <span>{coin.name} ({coin.symbol})</span>
            </label>
          ))}
        </div>
      ) : (
        /* Regular Tracking Metric Display Feed */
        <>
          {loading && <Loader message="Updating feed queries..." />}
          {error && <p style={{ color: "#ef4444", fontSize: "14px" }}>Failed to collect market calculations.</p>}
          
          {selectedCoins.length === 0 && !loading && (
            <p style={{ color: "var(--text)", fontStyle: "italic", fontSize: "14px", padding: "20px 0" }}>
              No assets selected. Click Edit to build a watchlist.
            </p>
          )}

          {data && !loading && selectedCoins.length > 0 && (
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "12px",
              maxHeight: "320px", 
              overflowY: "auto",
              paddingRight: "6px"
            }}>
              {AVAILABLE_COINS.filter(c => selectedCoins.includes(c.id)).map(coin => 
                renderCryptoRow(coin.id, coin.name, coin.symbol)
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}