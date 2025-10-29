import React from 'react';

const CurrentWeather = ({ data }) => {
  const { name, current, daily } = data;

  const getWeatherDescription = (code) => {
    const descriptions = {
        0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
        56: 'Light freezing drizzle', 57: 'Dense freezing drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
        66: 'Light freezing rain', 67: 'Heavy freezing rain', 71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
        77: 'Snow grains', 80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
        85: 'Slight snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Clear sky';
  };

  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="current-weather-card">
      <div className="card-header">
        <h3>{name}</h3>
        <p>{time}</p>
      </div>
      <div className="card-body">
        <div className="temperature-main">
          <p className="temperature">{Math.round(current?.temperature_2m ?? 0)}°C</p>
          <p className="weather-condition">{getWeatherDescription(current?.weather_code ?? 0)}</p>
          <p className="feels-like">Feels like {Math.round(current?.apparent_temperature ?? 0)}°C</p>
        </div>
        <div className="weather-description">
          <p>
            Today's forecast: {getWeatherDescription(daily?.weather_code?.[0] ?? 0)}. 
            The high will be {Math.round(daily?.temperature_2m_max?.[0] ?? 0)}°C, and the low will be {Math.round(daily?.temperature_2m_min?.[0] ?? 0)}°C.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
