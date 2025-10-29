import React, { useState, useEffect } from 'react';

const OtherCities = ({ onCityClick }) => {
  const [citiesWeather, setCitiesWeather] = useState([]);

  const cities = [
    { name: 'Mumbai', country: 'India' },
    { name: 'Delhi', country: 'India' },
    { name: 'Bangalore', country: 'India' },
    { name: 'Chennai', country: 'India' },
    { name: 'Hyderabad', country: 'India' },
  ];

  useEffect(() => {
    const fetchCitiesWeather = async () => {
      const weatherData = await Promise.all(
        cities.map(async (city) => {
          try {
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city.name}`);
            const geoData = await geoResponse.json();
            if (!geoData.results || geoData.results.length === 0) {
              return { ...city, temp: 'N/A', condition: 'N/A' };
            }
            const { latitude, longitude } = geoData.results[0];

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
            const weatherResponse = await fetch(weatherUrl);
            const weather = await weatherResponse.json();
            return { 
              ...city, 
              temp: Math.round(weather.current.temperature_2m),
              condition: getWeatherDescription(weather.current.weather_code)
            };
          } catch (error) {
            return { ...city, temp: 'N/A', condition: 'N/A' };
          }
        })
      );
      setCitiesWeather(weatherData);
    };

    fetchCitiesWeather();
  }, []);

  const getWeatherDescription = (code) => {
    const descriptions = {
        0: 'Clear', 1: 'Clear', 2: 'Cloudy', 3: 'Cloudy', 45: 'Fog', 48: 'Fog',
        51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle', 56: 'Drizzle', 57: 'Drizzle',
        61: 'Rain', 63: 'Rain', 65: 'Rain', 66: 'Rain', 67: 'Rain',
        71: 'Snow', 73: 'Snow', 75: 'Snow', 77: 'Snow',
        80: 'Rain', 81: 'Rain', 82: 'Rain', 85: 'Snow', 86: 'Snow',
        95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
    };
    return descriptions[code] || 'Clear';
  };

  return (
    <div className="other-cities">
      <div className="other-cities-header">
        <h3>Other Cities</h3>
      </div>
      <div className="city-list">
        {citiesWeather.map((city, index) => (
          <div className="city-card" key={index} onClick={() => onCityClick(city.name)}>
            <div className="city-info">
              <h4>{city.name}</h4>
              <p>{city.country}</p>
            </div>
            <div className="city-weather">
              <p className="temp">{city.temp}°C</p>
              <p className="condition">{city.condition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherCities;
