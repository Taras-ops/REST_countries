import React, {useState, useEffect} from 'react'
import './style.scss'
import { Container, CounryCard } from '../../components'

const Home = ({ darkmode, countries, fetchCountriesByRegion, fetchAllCountries }) => {
    const [showOpions, setShowOpions] = useState(false)
    const [textCounryInput, setTextCounryInput] = useState('')
    const [region, setRegion] = useState('')
    const [currentCountries, setCurrentCountries] = useState([])
    const [someCountries, setSomeCountries] = useState([])
    let resultCountries = []

    useEffect(() => {
      const data = countries.slice(0, 8)
      setSomeCountries(data)
    }, [countries])


    const onClickSelectButton = () => {
        setShowOpions(prev => !prev)
    }

    const onClickOnRegionLinkFilter = ({target}) => {
      const value = target.dataset.value
      if(value == region) {
        setRegion('')
        fetchAllCountries()
      } else {
        setRegion(value)
        fetchCountriesByRegion(value)
      }
    }

  const onChangeInputText = ({target}) => {
    setTextCounryInput(target.value)
    if(target.value) {
      let arr = countries.filter(country => country.name.official.toLowerCase().includes(target.value.toLowerCase()))
      arr = arr.slice(0, 8)
      setCurrentCountries(arr)
    } else {
      setCurrentCountries([])
    }
  } 

  if(currentCountries[0]) {
    resultCountries = currentCountries
  } else {
    resultCountries = someCountries
  }

  return (
    <main className={`home ${darkmode ? '_dark' : ''}`}>
      <Container>
        <div className='home__top'>
          <div className={`${darkmode ? '_dark-element' : '_light-element'} home__search-wrapper`}>
            <button type='submit' className='home__search-button'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z'
                  fill={darkmode ? '#ffffff' : '#848484'}
                />
              </svg>
            </button>
            <input
              type='search'
              className='home__search-input'
              name=''
              id=''
              value={textCounryInput}
              placeholder='Search for a country…'
              onChange={onChangeInputText}
            />
          </div>
          <div className="select">
            <div className={`${darkmode ? '_dark-element' : '_light-element'} select__header`} onClick={onClickSelectButton}>
              <p>Filter by Region</p>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.45 3.45L6 6.9L2.55 3.45L1.5 4.5L6 9L10.5 4.5L9.45 3.45Z" fill={darkmode ? "#fff" : "#000"}/>
              </svg>
            </div>
            <ul className={`${darkmode ? '_dark-element' : '_light-element'} select__options ${showOpions && 'show'}`}>
                <li><a onClick={onClickOnRegionLinkFilter} data-value="africa" className={`select__option-link ${region == 'africa' ? 'active' : ''}`}>Africa</a></li>
                <li><a onClick={onClickOnRegionLinkFilter} data-value="america" className={`select__option-link ${region == 'america' ? 'active' : ''}`}>America</a></li>
                <li><a onClick={onClickOnRegionLinkFilter} data-value="asia" className={`select__option-link ${region == 'asia' ? 'active' : ''}`}>Asia</a></li>
                <li><a onClick={onClickOnRegionLinkFilter} data-value="europe" className={`select__option-link ${region == 'europe' ? 'active' : ''}`}>Europe</a></li>
                <li><a onClick={onClickOnRegionLinkFilter} data-value="oceania" className={`select__option-link ${region == 'oceania' ? 'active' : ''}`}>Oceania</a></li> 
            </ul>
          </div>
        </div>

        <div className="home__countries-wrapper">
            {
              resultCountries.map((item) => <CounryCard key={item.cca2} {...item}/>)
            }
        </div>
      </Container>
    </main>
  )
}

export default Home
