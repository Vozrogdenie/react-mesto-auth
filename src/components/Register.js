import React from 'react';
import { Link} from 'react-router-dom';

function Register (props) {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  })
  


function  handleChange  (e)  {
    const {name, value} = e.target;
    this.setState({
      ...state,
      [name]: value
    });
  }
 function handleSubmit (e)  {
    e.preventDefault();
    const {email, password} = state;
    props.onRegister(email, password)
    .catch(err =>{
      console.log(err)

    })
  }

    return (
      <div className="register login">
        <p className="register__title login__title">Регистрация</p>
        <form onSubmit={handleSubmit} className="register__form login__form">
        <input required id="username" name="username" placeholder="Email" className="register__input login__input" type="text" value={state.username} onChange={handleChange} />
        <input required id="password" name="password" placeholder="Название" className="register__input login__input" type="password" value={state.password} onChange={handleChange} />
        <button type="submit" onSubmit={handleSubmit} className="register__submit-button login__submit-button">Зарегистрироваться</button>
        </form>
          <p className='register__text'>Уже зарегистрированы?</p>
            <Link to="/signin" className="register__login-link">Войти</Link>
        </div>
  );
}

export default Register;
