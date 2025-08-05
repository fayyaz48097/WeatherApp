import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Access the API key from the environment variable
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [country, setCountry] = useState("Pakistan");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const fetchWeather = () => {
    setLoading(true);
    setVisible(false);

    // Use the API key variable in your URL
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${country}`
      )
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setTimeout(() => setVisible(true), 100);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather();
  }, [country]);

  if (loading && !data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  const weatherCardClasses = `
    p-8 rounded-xl shadow-2xl bg-white text-gray-800 
    transform transition-all duration-700 ease-in-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
  `;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Weather App
        </h1>
        <p className="text-gray-500">
          Select a country to get the current weather.
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label
            htmlFor="country"
            className="block text-gray-700 font-bold mb-2"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {/* ... (Your country options remain the same) ... */}
          </select>
        </div>

        <div className={weatherCardClasses}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {data.location.name}
            </h2>
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              className="w-16 h-16"
            />
          </div>

          <div className="text-center">
            <p className="text-6xl font-light text-indigo-600">
              {data.current.temp_c}°C
            </p>
            <p className="text-xl text-gray-500 mb-4">
              Feels like {data.current.feelslike_c}°C
            </p>
            <p className="text-lg font-medium text-gray-600">
              Condition: {data.current.condition.text}
            </p>
            <div className="mt-4 text-sm text-gray-400">
              <p>Humidity: {data.current.humidity}%</p>
              <p>Wind: {data.current.wind_kph} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
