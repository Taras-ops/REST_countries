import React from 'react'
import Container from '../Container/Container'
import { Link } from 'react-router-dom'
import Noon from '../../images/noon.svg'
import NoonDarkmode from '../../images/noon_darkmode.svg'
import './style.scss'

const Header = ({darkmode, setDarkmode}) => {
    const onChangeDarkModeHandle = () => {
        setDarkmode(prev => !prev)
    }


  return (
    <header className={`header ${darkmode ? '_dark' : ''}`}>
      <Container>
        <div className="header__wrapper">
            <Link to="/"><p className="header__name">Where in the world?</p></Link>
            <a onClick={onChangeDarkModeHandle} className="header__darkmode">
                <img src={darkmode ? NoonDarkmode : Noon} alt="noon"/>
                <p>Dark Mode</p>
            </a>
        </div>
      </Container>
    </header>
  )
}

export default Header
