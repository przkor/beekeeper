import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { ContextLogin } from '../components/ContextLogin';

const Signin = (props) => {
    const history = useHistory()
    const {toggleUserLogged,changeUsername} = useContext(ContextLogin)
    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [wrongLogOrPass,setWronLogOrPass] = useState('')


    const handleLoginChange = (e) => {
        setLogin(e.target.value);
      }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      }
    const handleSubmit = (e) => {
          e.preventDefault()
      }

    useEffect(()=> {
      document.getElementById('mainMenu').style.display='none'
    }
    ,[]) 
              
    const signin = () => {
      axios
        .post("/signin", {
          login: login ,
          password: password,
        })
        .then(function (response) {
          if (response.data === "success") {    
            toggleUserLogged(true)
            changeUsername(login)
            setWronLogOrPass('Zalogowano poprawnie')
           // setLogin('')
          //  setPassword('')
            history.push('events')
            //self.props.history.push("/events")
            return
        }
          if (response.data === "failure") {
              setWronLogOrPass("Błędny login lub hasło")
              setLogin('')
              setPassword('')
            return
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
     
      return (
        <section>
        <div>
          <h4>Panel logowania</h4>
          <form className="form-signin" onSubmit={handleSubmit}>
            <label htmlFor="inputLogin" className="sr-only">
              Adres email
            </label>
            <input autoFocus={true}
              type="login"
              onChange={handleLoginChange}
              id="inputLogin"
              className="form-control"
              placeholder="Login"
              value={login}
              required
              
            />
            <label htmlFor="inputPassword" className="sr-only">
              Hasło
            </label>
            <input
              type="password"
              onChange={handlePasswordChange}
              id="inputPassword"
              value={password}
              className="form-control"
              placeholder="Hasło"
              required
            />
  
            <button
              className="btn btn-lg btn-primary btn-block"
              onClick={signin}
              type="button"
            >
              Zaloguj
            </button>
          </form>
          <div>
            <p>{wrongLogOrPass}</p>
            <Link to="/signup">{"Zarejestruj konto"}</Link>
          </div>
        </div>
        </section>
      );
    }
  

  export default Signin