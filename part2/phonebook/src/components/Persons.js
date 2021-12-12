const Persons = ({ persons }) => {
  return persons.length !== 0 ? (
    persons.map((person) => {
      return (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      );
    })
  ) : (
    <div>No names found</div>
  );
};
export default Persons;
