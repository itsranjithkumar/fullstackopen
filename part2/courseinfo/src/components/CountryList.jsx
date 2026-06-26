const CountryList = ({ countries, onShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => onShow(country)}>
              show
            </button>
          </div>
        ))}
      </div>
    )
  }

  if (countries.length === 1) {
    return null
  }

  return <p>No countries found</p>
}

export default CountryList