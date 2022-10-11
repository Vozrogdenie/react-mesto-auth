import React from 'react';
import { Link} from 'react-router-dom';

function Register (props) {
  const [state, setState] = React.useState({
    password:'',
    email: '',
    message:''
  })
  


function  handleChange  (e)  {
    const {name, value} = e.target;
    setState({
      ...state,
      [name]: value
    });
  }
 function handleSubmit (e)  {
    e.preventDefault();
    const {password, email} = state;
    props.onRegister(password, email)
    .catch(err =>{
      console.log(err)
      setState({
        ...state,
        message: 'Что-то пошло не так!'
      })

    })
  }

    return (
      <div className="register login">
        <p className="register__title login__title">Регистрация</p>
        <form onSubmit={handleSubmit} className="register__form login__form">
        <input required id="email" name="email" placeholder="Email" className="register__input login__input" type="text" value={state.email} onChange={handleChange} />
        <input required id="password" name="password" placeholder="Пароль" className="register__input login__input" type="password" value={state.password || ''} onChange={handleChange} />
        <button type="submit" onSubmit={handleSubmit} className="register__submit-button login__submit-button">Зарегистрироваться</button>
        </form>
          <p className='register__text'>Уже зарегистрированы?
            <Link to="/signin" className="register__link"> Войти</Link></p>
        </div>
  );
}

export default Register;
