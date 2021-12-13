import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      console.log("retrieved data once on load thanks to useEffect and []")
    });
  };

  useEffect(hook, []);

  const Country = ({ country }) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital[0]}</div>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([langcode, language]) => {
            return <li key={langcode}>{language}</li>;
          })}
        </ul>
        <img src={country.flags.png} alt={country.flag} />
      </>
    );
  };

  const Countries = ({ countries }) => {
    if (countries.length === 0 && searchValue.length) {
      return <div>No query matches</div>;
    } else if (countries.length <= 10) {
      return countries.map((country) => {
        return <div key={country.cca3}>{country.name.common}</div>; //key can't be a number apparently, I couldn't set ccn3 as key
      });
    } else if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
  };

  const handleSearch = (event) => {
    const searchedCountry = event.target.value;
    setSearchValue(searchedCountry);
    if (searchedCountry) {
      const lookupText = new RegExp(searchedCountry, "i");
      setFilteredCountries(
        countries.filter((country) => {
          return lookupText.test(country.name.common);
        })
      );
    } else {
      setFilteredCountries([]);
    }
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleSearch} value={searchValue} />
      </div>
      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </div>
  );
}
