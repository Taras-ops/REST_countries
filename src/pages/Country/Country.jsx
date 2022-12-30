import React, {useEffect, useState} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './style.scss'
import { Container } from '../../components'

const Country = ({darkmode, countries}) => {
  const [nativeName, setNativeName] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [languages, setLanguages] = useState([])

  const {countryName} = useParams()
  const navigate = useNavigate()

  const countryNameChanged = countryName.replace(/_/g, ' ')
  const currentCountry = countries.filter((item) => item.name.common == countryNameChanged)[0]

  const onClickButtonGoBack = () => {
    navigate(-1)
  }

  let bordersFifa = currentCountry?.borders
  let bordersCountries = []

  if(bordersFifa) {
    for (let i = 0; i < bordersFifa.length; i++) {
      let country = countries.filter((item) => item.fifa == bordersFifa[i])
      if(!country[0]) {
        country = countries.filter((item) => item.cca2 == bordersFifa[i])
        console.log(55)
      } 
      if(!country[0]) {
        console.log(11)
        country = countries.filter((item) => item.cca3 == bordersFifa[i])
        console.log(country)
      } 
      if(!country[0]) {
        country = countries.filter((item) => item.cioc == bordersFifa[i])
      }
      bordersCountries.push(country[0])
    }
  }

  console.log(bordersCountries)

  const getNativeName = () => {
    let obj = currentCountry?.name.nativeName
    let values = obj && Object.values(obj)
    return values
  }

  const getCurriences = () => {
    let obj = currentCountry?.currencies
    let values = obj && Object.values(obj)
    return values
  }

  const getLanguages = () => {
    let obj = currentCountry?.languages
    let values = obj && Object.values(obj)
    return values
  }

  useEffect(() => {
    setNativeName(getNativeName())
    setCurrencies(getCurriences())
    setLanguages(getLanguages())
  }, [currentCountry])

  console.log(currentCountry)

  return (
    <section className={darkmode ? 'country _dark' : 'country'}>
      <Container>
        <div className="button-back__wrapper">
          <button onClick={onClickButtonGoBack} className={`${darkmode ? '_dark-element' : '_light-element'} button-back`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z" fill="#111517"/>
            </svg>
            Back
          </button>
        </div>
        <div className="country__wrapper">
          <div className="country__flag">
            <img src={currentCountry?.flags.png} alt={`${currentCountry?.name.official} flag`} />
          </div>
          <div className="country__content">
            <h2 className="country__name">{currentCountry?.name.official}</h2>
            <div className="country__info">
              <ul>
                <li>Native Name: {nativeName?.map((item, index) => <span key={index}>{item.official} </span>)}</li>
                <li>Population: <span>{currentCountry?.population}</span></li>
                <li>Region: <span>{currentCountry?.region}</span></li>
                <li>Sub Region: <span>{currentCountry?.subregion}</span></li>
                <li>Capital: {currentCountry?.capital.map((capital, index) => <span key={index}>{capital} </span>)}</li>
              </ul>
              <ul>
                <li>Top Level Domain: {currentCountry?.tld.map((tld, index) => <span key={index}>{tld}</span>)}</li>
                <li>Currencies: {currencies?.map((item) => <span key={item.name}>{item.name} </span>)}</li>
                <li>Languages: {languages?.map((item) => <span key={item}>{item} </span>)}</li>
              </ul>
            </div>
            <div className="country__borders">
              <p className='country__borders-p'>Border Countries:</p>
                {
                  bordersCountries?.map((country) => <Link to={`../country/${country?.name.common}`}>
                    <span className={darkmode ? '_dark-element' : '_light-element'}>{country?.name.common}</span>
                  </Link>)
                }
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Country