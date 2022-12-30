import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const CountryCard = ({capital, population, name, region, flags}) => {
    let nameReplaced = name.common.replace(/ /g, '_')


  return (
    <div className='card'>
        <div className="card__image" style={{backgroundImage: `url(${flags.png})`}}></div>
        <div className="card__content">
            <Link to={`/country/${nameReplaced}`}><h3 className="card__name">{name.official}</h3></Link>
            <ul>
                <li>
                    <p>Population: <span>{population}</span></p>
                </li>
                <li>
                    <p>Region: <span>{region}</span></p>
                </li>
                <li>
                    <p>Capital: <span>{capital}</span></p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default CountryCard