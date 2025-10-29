import React, { useState } from 'react';

const HourlyForecast = ({ data }) => {
  const { hourly, daily } = data;
  const [activeTab, setActiveTab] = useState('Today');

  const getWeatherIcon = (code) => {
    const icons = {
        0: '☀️', 1: '🌤️', 2: '☁️', 3: '☁️', 45: '🌫️', 48: '🌫️',
        51: '🌦️', 53: '🌦️', 55: '🌦️', 56: '🌦️', 57: '🌦️',
        61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
        71: '❄️', 73: '❄️', 75: '❄️', 77: '❄️', 80: '🌧️', 81: '🌧️', 82: '🌧️',
        85: '❄️', 86: '❄️', 95: '⛈️', 96: '⛈️', 99: '⛈️',
    };
    return icons[code] || '☀️';
  };

  const hourlyData = hourly?.time?.slice(0, 24).map((time, index) => ({
    time: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    temp: Math.round(hourly.temperature_2m?.[index] ?? 0),
    code: hourly.weather_code?.[index] ?? 0,
  })) ?? [];

  const weeklyData = daily?.time?.map((time, index) => ({
    day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
    maxTemp: Math.round(daily.temperature_2m_max?.[index] ?? 0),
    minTemp: Math.round(daily.temperature_2m_min?.[index] ?? 0),
    code: daily.weather_code?.[index] ?? 0,
  })) ?? [];

  return (
    <div className="hourly-forecast-card">
      <div className="tabs">
        <button className={activeTab === 'Today' ? 'active' : ''} onClick={() => setActiveTab('Today')}>Today</button>
        <button className={activeTab === 'Week' ? 'active' : ''} onClick={() => setActiveTab('Week')}>Week</button>
      
      </div>
      <div className="hourly-items">
        {activeTab === 'Today' && hourlyData.slice(0, 5).map((hour, index) => (
          <div className="hourly-item" key={index}>
            <p>{hour.time}</p>
            <div className="weather-icon">{getWeatherIcon(hour.code)}</div>
            <p>{hour.temp}°C</p>
          </div>
        ))}
        {activeTab === 'Week' && weeklyData.map((day, index) => (
          <div className="hourly-item" key={index}>
            <p>{day.day}</p>
            <div className="weather-icon">{getWeatherIcon(day.code)}</div>
            <p>{day.maxTemp}°/{day.minTemp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;