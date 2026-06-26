import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  // LOAD COUNTRIES
  useEffect(() => {
    countriesService.getAll().then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setSelectedCountry(null)
  }

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Country Information</h2>

      <div>
        find countries:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>

      {/* LIST OR MESSAGE */}
      <CountryList
        countries={countriesToShow}
        onShow={setSelectedCountry}
      />

      {/* DETAIL VIEW */}
      {selectedCountry && (
        <CountryDetail country={selectedCountry} />
      )}

      {/* AUTO SHOW SINGLE COUNTRY */}
      {countriesToShow.length === 1 && (
        <CountryDetail country={countriesToShow[0]} />
      )}
    </div>
  )
}

export default App