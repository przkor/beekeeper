import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { ContextLogin } from '../components/ContextLogin';

const Signin = (props) => {
    const history = useHistory()
    const {toggleUserLogged,changeUsername} = useContext(ContextLogin)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [wrongLogOrPass,setWronLogOrPass] = useState("")


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
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
          email: email ,
          password: password,
        })
        .then(function (response) {
          if (response.data === "success") {    
            toggleUserLogged(true)
            changeUsername(email)
            setWronLogOrPass('Zalogowano poprawnie')
            setEmail('')
            setPassword('')
            history.push('events')
            //self.props.history.push("/events")
            return
        }
          if (response.data === "failure") {
              setWronLogOrPass("Błędny login lub hasło")
              setEmail('')
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
            <label htmlFor="inputEmail" className="sr-only">
              Adres email
            </label>
            <input autoFocus={true}
              type="email"
              onChange={handleEmailChange}
              id="inputEmail"
              className="form-control"
              placeholder="Email"
              value={email}
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