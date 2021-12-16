import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  return persons.length !== 0 ? (
    persons.map((person) => {
      return (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => handleDelete(person.id)}
        />
      );
    })
  ) : (
    <div>No names found</div>
  );
};
export default Persons;
