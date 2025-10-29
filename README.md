## Weather Now

A modern React app to view current weather, hourly forecast, weekly outlook, and key atmospheric metrics for any city. It auto-detects your location (with permission) and provides smart search with suggestions.

### Features
- **Auto‑location startup**: Uses browser Geolocation; falls back to Mumbai if denied/unavailable.
- **City search with suggestions**: Type 3+ letters to see top matches from geocoding.
- **Current conditions**: Temperature, feels like, condition code mapping, visibility, wind, precipitation, dew point, pressure, cloud cover, UV index.
- **Hourly and weekly tabs**: Quick toggle between next‑hours snapshot and week overview.
- **Other cities quick view**: One‑click load for popular Indian cities.
- **Light/Dark theme**: Toggle in header; persisted for the session via `data-theme` attribute.
- **Responsive UI**: Clean, glassmorphism‑inspired cards.

### Tech Stack
- **Frontend**: React 19, Vite 7, JSX
- **Styling**: Tailwind CSS 4 (via `@tailwindcss/vite`) + custom CSS in `src/App.css`
- **Charts/Animation**: Recharts, Framer Motion (available; not all screens may use them)
- **Icons**: lucide-react (available)
- **Linting**: ESLint 9 with React Hooks and Vite Refresh configs

### Data Sources
- **Forecast & current**: Open‑Meteo Forecast API
  - Daily, hourly, and current fields requested via `https://api.open-meteo.com/v1/forecast` with query params for many variables.
- **Geocoding**: Open‑Meteo Geocoding API
  - City name to lat/long and for search suggestions: `https://geocoding-api.open-meteo.com/v1/search`.
- **Reverse geocoding**: BigDataCloud Reverse Geocode Client
  - Turn lat/long to city at startup: `https://api.bigdatacloud.net/data/reverse-geocode-client`.

No API keys are required for the above endpoints.

### Getting Started
1. Ensure Node.js 18+ installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal. Grant location permission for auto‑detection, or use the search bar.

### Build & Preview
- Production build:
  ```bash
  npm run build
  ```
- Preview the production build locally:
  ```bash
  npm run preview
  ```

### Project Structure
```text
/public/                 Static assets served as-is
/src/
  assets/               Images (e.g., weather-now.png)
  components/           UI components
    Header.jsx          App header, theme toggle, search bar
    Searchbar.jsx       City input + geocoding suggestions
    Dashboard.jsx       Page layout; composes all cards
    CurrentWeather.jsx  Current conditions overview
    HourlyForecast.jsx  Hourly/Weekly tabs and items
    Overview.jsx        Metrics cards (UV, wind, pressure, etc.)
    OtherCities.jsx     Quick links for popular cities
  App.jsx               Data fetching and global state
  App.css               Styles and design tokens
  index.css             Tailwind import and base
  main.jsx              React root
vite.config.js          Vite + React + Tailwind plugin setup
eslint.config.js        ESLint config
```

### Environment & Permissions
- The app requests browser **Geolocation** on first load to auto‑detect city. If blocked or unavailable, it defaults to Mumbai.
- No `.env` is required. All APIs used are free and keyless.

### Scripts
- **npm run dev**: Start Vite dev server
- **npm run build**: Build for production
- **npm run preview**: Preview the production build
- **npm run lint**: Lint all `js/jsx` files

### Styling Notes
- Tailwind v4 is enabled via `@tailwindcss/vite` and imported in `src/index.css`.
- Additional design tokens and components are styled in `src/App.css` using CSS variables scoped by `data-theme`.

### Accessibility & UX
- High contrast themes via `data-theme` attribute and CSS variables.
- Keyboard‑friendly search form.
- Clear error and loading states in the dashboard.

### Known Limitations
- Favicon is not set in `index.html` (link tag present with empty href).
- Some optional dependencies (e.g., Recharts, Framer Motion, lucide-react) may not be used on every screen.
- Weather code to text/icon mapping is simplified for clarity and does not cover every edge case.

### Troubleshooting
- **Location not detected**: Ensure browser permissions are allowed, or search manually.
- **No suggestions**: Requires 3+ characters; confirm network access to Open‑Meteo Geocoding API.
- **Blank data**: APIs are public; temporary rate limits or network issues may occur. Try again or switch city.

### License
This project is provided as‑is, without warranty. Add a license file if you plan to distribute.

### Acknowledgements
- Open‑Meteo for forecast and geocoding services.
- BigDataCloud for reverse geocoding.

