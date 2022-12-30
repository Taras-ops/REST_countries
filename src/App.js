import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import { Header } from "./components"
import { Country, Home } from './pages';

function App() {
    const [darkmode, setDarkmode] = useState(false);
    const [countries, setCountries] = useState([]);

    const fetchAllCountries = async () => {
        const res = await fetch('https://restcountries.com/v3.1/all')
        const data = await res.json()
        setCountries(data)
    }

    const fetchCountriesByRegion = async (region) => {
        const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        const data = await res.json()
        setCountries(data)
    }

    useEffect(() => {
        fetchAllCountries()
    }, [])

    return (
        <>
            <Header darkmode={darkmode} setDarkmode={setDarkmode}/>
            <Routes>
                <Route path='/' element={<Home darkmode={darkmode} countries={countries} fetchAllCountries={fetchAllCountries} fetchCountriesByRegion={fetchCountriesByRegion}/>}/>
                <Route path='/country/:countryName' element={<Country countries={countries} darkmode={darkmode}/>}/>
            </Routes>
        </>
    )
}

export default App