const Persons = ({ persons, removePerson }) => {
  return (
    <>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}

          <button
            onClick={() => removePerson(person.id)}
          >
            delete
          </button>
        </p>
      ))}
    </>
  )
}

export default Persons