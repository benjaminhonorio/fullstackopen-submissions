import React, { useState } from "react";

const App = () => {
  const people = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ];

  const [persons, setPersons] = useState(people); // people to be shown in the phonebook
  const [allPeople, setAllPeople] = useState(people); // keeps all people including newly added
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

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
      <div>
        filter shown with <input onChange={handleSearch} value={searchValue} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={handleName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length !== 0 ? (
        persons.map((person) => {
          return (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          );
        })
      ) : (
        <div>No names found</div>
      )}
    </div>
  );
};

export default App;
