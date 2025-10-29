import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState('');

  const getWeatherCondition = (code) => {
    const conditions = {
      0: 'clear', 1: 'clear', 2: 'clouds', 3: 'clouds', 45: 'fog', 48: 'fog',
      51: 'drizzle', 53: 'drizzle', 55: 'drizzle', 56: 'drizzle', 57: 'drizzle',
      61: 'rain', 63: 'rain', 65: 'rain', 66: 'rain', 67: 'rain',
      71: 'snow', 73: 'snow', 75: 'snow', 77: 'snow',
      80: 'rain', 81: 'rain', 82: 'rain', 85: 'snow', 86: 'snow',
      95: 'thunderstorm', 96: 'thunderstorm', 99: 'thunderstorm',
    };
    return conditions[code] || 'clear';
  };

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
      const geoData = await geoResponse.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      const { latitude, longitude, name } = geoData.results[0];

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,surface_pressure,cloud_cover_low,cloud_cover,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_speed_80m,temperature_80m,temperature_120m,temperature_180m,wind_direction_80m,wind_direction_10m,soil_temperature_0cm,soil_temperature_6cm&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,rain,showers,snowfall,weather_code,visibility`;
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      setWeatherData({ ...weatherData, name });
      if (weatherData.current) {
        const condition = getWeatherCondition(weatherData.current.weather_code);
        setWeatherCondition(condition);
      }
    } catch (err) {
      setError(err.message);
      setWeatherCondition('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("Geolocation is available.");
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log("Got position:", position.coords);
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await response.json();
          console.log("Reverse geocoding data:", data);
          const city = data.city ? data.city.trim() : 'mumbai';
          fetchWeatherData(city);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          fetchWeatherData('mumbai');
        }
      }, (error) => {
        console.error("Geolocation permission denied or error:", error);
        fetchWeatherData('mumbai');
      });
    } else {
      console.log("Geolocation is not available.");
      fetchWeatherData('mumbai');
    }
  }, []);

  return (
    <div className={`app ${weatherCondition}`}>
      <Dashboard 
        weatherData={weatherData} 
        loading={loading} 
        error={error} 
        onSearch={fetchWeatherData} 
      />
    </div>
  );
};

export default App;

