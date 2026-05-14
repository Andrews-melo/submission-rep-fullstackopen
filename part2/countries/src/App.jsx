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

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([])
  const [icon, setIcon] = useState(null)
  const capital = country?.capital[0]

  if (!capital) {
    return null
  }

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_API_KEY}`).then((res) => {
      setWeather(res.data)
      setIcon(res.data.weather[0].icon)
    })
  }, [capital])

  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>Temperature {(weather?.main?.temp - 273.15)?.toFixed(2)} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
      <p>Wind {(weather?.wind?.speed)?.toFixed(2)} m/s</p>
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
        <label>find countries </label>
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
      {countries.length === 1 && <Weather country={countries[0]} />}
    </>
  )
}

export default App
