import React, { useState, useEffect } from 'react';

const Searchbar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city.length > 2) {
      const fetchSuggestions = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`);
          const data = await response.json();
          setSuggestions(data.results || []);
        } catch (error) {
          setError('Failed to fetch suggestions');
          setSuggestions([]);
        }
        setLoading(false);
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion.name);
    setCity('');
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <form onSubmit={(e) => { e.preventDefault(); if(city) onSearch(city); setCity(''); }}>
        <button type="submit">🔍</button>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search City"
        />
      </form>
      {loading && <div className="suggestions-list"><li>Loading...</li></div>}
      {error && <div className="suggestions-list"><li>{error}</li></div>}
      {!loading && !error && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
