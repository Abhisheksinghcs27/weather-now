import React, { useState, useEffect } from 'react';

const SunriseSunset = ({ data }) => {
  if (!data || !data.daily) {
    return null;
  }

  const [timeToNext, setTimeToNext] = useState('');
  const [nextEvent, setNextEvent] = useState('');

  useEffect(() => {
    const calculateTimeToNextEvent = () => {
      const now = new Date();
      const sunrise = new Date(data.daily.sunrise[0]);
      const sunset = new Date(data.daily.sunset[0]);

      let eventTime;
      let eventName;

      if (now < sunrise) {
        eventTime = sunrise;
        eventName = 'Sunrise';
      } else if (now < sunset) {
        eventTime = sunset;
        eventName = 'Sunset';
      } else {
        // Next day's sunrise
        const tomorrowSunrise = new Date(data.daily.sunrise[1]);
        eventTime = tomorrowSunrise;
        eventName = 'Sunrise';
      }

      const diff = eventTime.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeToNext(`${hours}h ${minutes}m`);
      setNextEvent(eventName);
    };

    calculateTimeToNextEvent();
    const interval = setInterval(calculateTimeToNextEvent, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [data]);


  const sunriseTime = new Date(data.daily.sunrise[0]).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const sunsetTime = new Date(data.daily.sunset[0]).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="sunrise-sunset-card">
      <h3>Sunrise & Sunset</h3>
      <div className="sunrise-sunset-content">
        <div className="sunrise">
          <span className="sunrise-icon">🌅</span>
          <p>{sunriseTime}</p>
        </div>
        <div className="sunset">
          <span className="sunset-icon">🌇</span>
          <p>{sunsetTime}</p>
        </div>
      </div>
      <div className="time-to-next">
        <p>{nextEvent} in {timeToNext}</p>
      </div>
    </div>
  );
};

export default SunriseSunset;