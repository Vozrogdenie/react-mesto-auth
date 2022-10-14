import React from 'react';
import { Link } from 'react-router-dom';
import headLogo from '../images/Mesto.png'

function Header(props) {

    return (
        <header className="header">
            <img className="header__logo" src={headLogo} alt="Логотип" />
            <Link to={props.path} type='button' className="header__link" onClick={props.onLogout}> {props.link}</Link>
        </header>
    );
}

export default Header