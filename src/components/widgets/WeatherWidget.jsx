import useFetch from "../../hooks/useFetch";
import Loader from "./Loader";

function getWeatherCondition(code) {
  if (code === 0) return "Clear Skies";
  if ([1, 2, 3].includes(code)) return "Partly Cloudy";
  if ([45, 48].includes(code)) return "Foggy Conditions";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "Raining";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowing";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Overcast";
}

export default function WeatherWidget() {
  const { data, loading, error } = useFetch(
    "https://api.open-meteo.com/v1/forecast?latitude=53.6475&longitude=-3.0053&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m"
  );

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100%", 
      minHeight: "380px",  // Matches the crypto tracking list card bounds precisely
      maxHeight: "380px",  // Locks structural stretching
      justifyContent: "space-between",
      overflow: "hidden"   // Prevents layout spilling
    }}>
      {/* 1. Header Block */}
      <div>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "var(--text-h)" }}>Regional Weather</h3>
        <p style={{ margin: 0, fontSize: "12px", color: "var(--text)" }}>Southport, UK</p>
      </div>

      {/* 2. Loading / Error / Data Core */}
      {loading && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loader message="Reading satellite gauges..." />
        </div>
      )}
      
      {error && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#ef4444", fontSize: "14px", margin: 0 }}>Telemetry missing.</p>
        </div>
      )}

      {data && !loading && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "baseline", 
            justifyContent: "center", 
            gap: "12px", 
            margin: "20px 0" 
          }}>
            <span style={{ fontSize: "52px", fontWeight: "800", color: "var(--text-h)", lineHeight: "1" }}>
              {Math.round(data.current.temperature_2m)}°C
            </span>
            <span style={{ fontSize: "15px", fontWeight: "600", color: "var(--accent)" }}>
              {getWeatherCondition(data.current.weather_code)}
            </span>
          </div>
        </div>
      )}

      {/* 3. Locked Bottom Information Grid */}
      {data && !loading && (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "12px 16px", 
          borderTop: "1px solid var(--border)", 
          paddingTop: "16px"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "11px", color: "var(--text)", fontWeight: "500" }}>FEELS LIKE</span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-h)" }}>
              {Math.round(data.current.apparent_temperature)}°C
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "11px", color: "var(--text)", fontWeight: "500" }}>HUMIDITY</span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-h)" }}>
              {data.current.relative_humidity_2m}%
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "11px", color: "var(--text)", fontWeight: "500" }}>WIND SPEED</span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-h)" }}>
              {data.current.wind_speed_10m} km/h
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "11px", color: "var(--text)", fontWeight: "500" }}>LOCATION</span>
            <span style={{ fontSize: "13px", fontFamily: "var(--mono)", color: "var(--text-h)", fontWeight: "600" }}>
              NW-53
            </span>
          </div>
        </div>
      )}
    </div>
  );
}