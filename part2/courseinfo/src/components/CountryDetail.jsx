import Weather from './Weather'

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt="flag"
        width="150"
      />

      <Weather capital={country.capital?.[0]} />
    </div>
  )
}

export default CountryDetail