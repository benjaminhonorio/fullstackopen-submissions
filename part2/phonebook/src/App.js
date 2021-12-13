import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {

  const [persons, setPersons] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setAllPeople(response.data);
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    if (allPeople.filter((person) => person.name === newName).length === 0) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setAllPeople(allPeople.concat({ name: newName, number: newNumber }));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
    let lookupText = new RegExp(searchInput, "i");
    let filteredPeople = allPeople.filter((person) =>
      lookupText.test(person.name)
    );
    filteredPeople.length !== 0 ? setPersons(filteredPeople) : setPersons([]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} searchValue={searchValue} />
      <h3>add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
