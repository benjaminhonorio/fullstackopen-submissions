import React, { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import DisplayCountry from "./components/DisplayCountry";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [displayCountry, setDisplayCountry] = useState({});

  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const showCountry = (cca3) => {
    return () => {
      const country = countries.filter((country) => country.cca3 === cca3)[0];
      setDisplayCountry(country);
    };
  };

  const handleSearch = (event) => {
    const searchedCountry = event.target.value;
    setSearchValue(searchedCountry);
    setDisplayCountry({});
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
      <Countries
        countries={filteredCountries}
        searchValue={searchValue}
        showCountry={showCountry}
      />
      <DisplayCountry country={displayCountry} />
    </div>
  );
};

export default App;
