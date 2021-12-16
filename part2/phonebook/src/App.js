import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/person";

const App = () => {
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const hook = () => {
    console.log("effect");
    personServices.getAll().then((initialPeople) => {
      console.log("promise fulfilled");
      setAllPeople(initialPeople);
      setFilteredPeople(initialPeople);
    });
  };
  useEffect(hook, []);

  const addNewPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (allPeople.filter((person) => person.name === newName).length === 0) {
      personServices.create(newPerson).then((returnedPerson) => {
        setFilteredPeople(filteredPeople.concat(returnedPerson));
        setAllPeople(allPeople.concat(returnedPerson));
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (confirmDelete) {
      personServices.deletePerson(id);
      setFilteredPeople(allPeople.filter((person) => person.id !== id));
      setAllPeople(allPeople.filter((person) => person.id !== id));
      setSearchValue("");
    }
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
    let justFilteredPeople = allPeople.filter((person) =>
      lookupText.test(person.name)
    );
    filteredPeople.length !== 0
      ? setFilteredPeople(justFilteredPeople)
      : setFilteredPeople([]);
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
      <Persons persons={filteredPeople} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
