import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const hook = () => {
    axios
      .get(`${API_URL}${country.capital}&appid=${API_KEY}`)
      .then((response) => {
        setWeather(response.data);
      });
  };
  useEffect(hook, [country]);

  const windDegToDirection = (windDeg = 0) => {
    if (
      (windDeg > 348.75 && windDeg <= 360) ||
      (windDeg >= 0 && windDeg <= 11.25)
    )
      return "N";
    if (windDeg > 11.25 && windDeg <= 33.75) return "NNE";
    if (windDeg > 33.75 && windDeg <= 56.25) return "NE";
    if (windDeg > 56.25 && windDeg <= 78.75) return "ENE";
    if (windDeg > 78.75 && windDeg <= 101.25) return "E";
    if (windDeg > 101.25 && windDeg <= 123.75) return "ESE";
    if (windDeg > 123.75 && windDeg <= 146.25) return "SE";
    if (windDeg > 146.25 && windDeg <= 168.75) return "SSE";
    if (windDeg > 168.75 && windDeg <= 191.25) return "S";
    if (windDeg > 191.25 && windDeg <= 213.75) return "SSW";
    if (windDeg > 213.75 && windDeg <= 236.25) return "SW";
    if (windDeg > 236.25 && windDeg <= 258.75) return "WSW";
    if (windDeg > 258.75 && windDeg <= 258.75) return "WSW";
    if (windDeg > 281.25 && windDeg <= 303.75) return "W";
    if (windDeg > 303.75 && windDeg <= 326.25) return "NW";
    if (windDeg > 326.25 && windDeg <= 348.75) return "NNW";
  };

  const temp = (Object.keys(weather).length && weather.main?.temp) || 0;
  const windDir = (Object.keys(weather).length && weather.wind.deg) || 0;
  const windSpeed = (Object.keys(weather).length && weather.wind?.speed) || 0;

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital?.[0]}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([langcode, language]) => {
          return <li key={langcode}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flag} />
      <h2>
        Weather in {country.capital ? country.capital : country.name.common}
      </h2>
      <div>
        <strong>temperature: </strong>
        {temp}
      </div>
      <img src={"#"} alt="" />
      <div>
        <strong>wind: </strong>
        {`${windSpeed * 2.237} mph  direction ${windDegToDirection(windDir)}`}
      </div>
    </>
  );
};

export default Country;
