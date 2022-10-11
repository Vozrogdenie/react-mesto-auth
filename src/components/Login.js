import React from "react";
import {Link, withRouter} from 'react-router-dom';

function Login (props) {
  const [state, setState] = React.useState({
    username: '',
    password: ''
  })

  function  handleChange (e) {
        const {name, value} = e.target;
        setState({
          ...state,
            [name]:value
        })
    }

   function handleSubmit (e) {
        e.preventDefolt()
        const {username, password} = state;
        if (!username || !password) return; 
        props.onLogin(username, password)
        .catch(err =>{
          console.log(err)
          setState({
            ...state,
            messange: 'Xnj-nj gjikf yt nfr'
          })
        })
    }

        return(
          <div className="login">
            <p className="login__title">Вход</p>
            <form onSubmit={handleSubmit} className="login__form">
              <input required id="username" name="username" placeholder="Email" className="login__input login__input_value_name" type="text" value={state.username} onChange={handleChange} />
              <input required id="password" name="password" placeholder="Название" className="login__input login__input_value_password" type="password" value={state.password} onChange={handleChange} />
              <button type="submit" className="login__submit-button">Войти</button>
            </form>
          </div>
        )
    }
    
    export default Login;