import React from 'react';
import headLogo from '../images/Mesto.png'
import{Link} from 'react-router-dom'

function Header(props){

    return (
    <header className="header"> 
        <img className="header__logo" src={headLogo} alt="Логотип"/>
        <Link to={props.path} className="header__link"> {props.link}</Link>
    </header>
    );
}

export default Header