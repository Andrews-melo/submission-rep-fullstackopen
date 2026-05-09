import { useEffect, useState } from "react"
import axios from "axios"

const Country = ({ country }) => {
  return (
    <div>
      <p>{country.name.common}</p>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <p>Languages</p>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (searchTerm.length > 0) {
      axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`).then((res) => {
        setCountries(res.data)
      })
    } else {
      setCountries([])
    }
  }, [searchTerm])


  const handleCountryChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <div>
        <label>find countries</label>
        <input type="text" onChange={handleCountryChange} value={searchTerm} />
      </div>
      <div>
        {countries.length === 1 ? <Country country={countries[0]} /> : countries.length > 10 ? 'Too many matches, specify another filter' :
          countries.map(country => (
            <div key={country.cca3}>
              <label>{country.name.common}</label>
              <button onClick={() => setSearchTerm(country.name.common)}>show</button>
            </div>
          ))}
      </div>
    </>
  )
}

export default App
