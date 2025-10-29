import React from 'react';
import Header from './Header';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import Overview from './Overview';
import OtherCities from './OtherCities';


const Dashboard = ({ weatherData, loading, error, onSearch }) => {
  return (
    <div className="dashboard-container">
      <Header onSearch={onSearch} />
      <main className="main-content">
        <div className="left-column">
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {weatherData && !error && (
            <>
              <CurrentWeather data={weatherData} />
              <Overview data={weatherData} />
            </>
          )}
        </div>
        <div className="right-column">
          {weatherData && !error && <HourlyForecast data={weatherData} />}
         
          <OtherCities onCityClick={onSearch} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
