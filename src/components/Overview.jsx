

const Overview = ({ data }) => {
  if (!data || !data.current) {
    return null;
  }

  const getUvIndexDescription = (uvIndex) => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  };

  const uvIndex = data.daily?.uv_index_max?.[0] ?? 0;
  const cloudCover = data.hourly?.cloud_cover?.[0] ?? 0;
  const surfacePressure = data.hourly?.surface_pressure?.[0] ?? 0;

  return (
    <div className="overview">
      <h3>Overview</h3>
      <div className="overview-grid">
        <div className="overview-card">
          <h4>Humidity</h4>
          <div className="overview-card-content">
            <span className="overview-icon">💧</span>
            <p>{data.current.relative_humidity_2m ?? 0}%</p>
          </div>
          <p className="overview-description">Amount of moisture in the air</p>
        </div>
        <div className="overview-card">
          <h4>UV Index</h4>
          <div className="overview-card-content">
            <div className="uv-index-bar">
              <div className="uv-index-level" style={{ width: `${(uvIndex / 12) * 100}%` }}></div>
            </div>
            <p>{Math.round(uvIndex)} ({getUvIndexDescription(uvIndex)})</p>
          </div>
        </div>
        <div className="overview-card">
          <h4>Visibility</h4>
          <div className="overview-card-content">
            <span className="overview-icon">👁️</span>
            <p>{(data.current.visibility ?? 0) / 1000} km</p>
          </div>
          <p className="overview-description">Haze is affecting visibility</p>
        </div>
        <div className="overview-card">
          <h4>Feels Like</h4>
          <div className="overview-card-content">
            <span className="overview-icon">🌡️</span>
            <p>{Math.round(data.current.apparent_temperature ?? 0)}°C</p>
          </div>
          <p className="overview-description">How the temperature actually feels</p>
        </div>
        <div className="overview-card">
          <h4>Wind</h4>
          <div className="overview-card-content">
            <span className="overview-icon">💨</span>
            <p>{data.current.wind_speed_10m ?? 0} km/h</p>
          </div>
          <p className="overview-description">Wind direction: {data.current.wind_direction_10m ?? 0}°</p>
        </div>
        <div className="overview-card">
          <h4>Precipitation</h4>
          <div className="overview-card-content">
            <span className="overview-icon">💧</span>
            <p>{data.current.precipitation ?? 0} mm</p>
          </div>
          <p className="overview-description">Current precipitation amount</p>
        </div>
        <div className="overview-card">
          <h4>Cloud Cover</h4>
          <div className="overview-card-content">
            <span className="overview-icon">☁️</span>
            <p>{cloudCover}%</p>
          </div>
          <p className="overview-description">Current cloud coverage</p>
        </div>
        <div className="overview-card">
          <h4>Surface Pressure</h4>
          <div className="overview-card-content">
            <span className="overview-icon">💨</span>
            <p>{surfacePressure} hPa</p>
          </div>
          <p className="overview-description">Current atmospheric pressure</p>
        </div>
        <div className="overview-card">
          <h4>Dew Point</h4>
          <div className="overview-card-content">
            <span className="overview-icon">💧</span>
            <p>{Math.round(data.current.dew_point_2m ?? 0)}°C</p>
          </div>
          <p className="overview-description">Point of condensation</p>
        </div>
        <div className="overview-card">
          <h4>Rain</h4>
          <div className="overview-card-content">
            <span className="overview-icon">🌧️</span>
            <p>{data.current.rain ?? 0} mm</p>
          </div>
          <p className="overview-description">Current rain amount</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
