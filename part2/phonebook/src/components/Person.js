export default function Person({ person, deletePerson }) {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={deletePerson}>delete</button>
    </div>
  );
}
