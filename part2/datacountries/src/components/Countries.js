import Country from "./Country";

const Countries = ({ countries, searchValue, showCountry }) => {
  if (countries.length === 0 && searchValue.length) {
    return <div>No query matches</div>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else if (countries.length <= 10) {
    return countries.map((country) => {
      return (
        <div key={country.cca3}>
          <span>{country.name.common}</span>
          <button onClick={showCountry(country.cca3)}>show</button>
        </div>
      );
    });
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

export default Countries;
