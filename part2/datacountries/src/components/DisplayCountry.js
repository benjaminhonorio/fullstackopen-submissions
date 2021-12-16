import Country from "./Country";

const DisplayCountry = ({ country: displayCountry }) => {
  if (Object.keys(displayCountry).length !== 0)
    return <Country country={displayCountry} />;
  else {
    return null;
  }
};

export default DisplayCountry;
