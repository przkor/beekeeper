import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { ContextLogin } from '../components/ContextLogin';
import { Container,Col,Row } from 'react-bootstrap';

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
      axios({
        method:'get',
        url:'/user/signin',
        params:{
          login:login,
          password:password
        }
        
      })
        .then(function (response) {
          if (response.data === "success") {    
            toggleUserLogged(true)
            changeUsername(login)
            setWronLogOrPass('Zalogowano poprawnie')
            history.push('/tasks')
            //self.props.history.push("/tasks")
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
        <Container>
          <h4>Panel logowania</h4>
          <Row className="justify-content-center">
            <Col lg={6} md={6} sm={9}>
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
              autoComplete="username"
              
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
              autoComplete="current-password"
            />
  
            <button
              className="btn btn-lg btn-primary btn-block"
              onClick={signin}
              type="button"
            >
              Zaloguj
            </button>
          </form>
          </Col>
          </Row>
          <Row className="justify-content-center">
            <Col  lg={6} md={6} sm={9}>
            <p>{wrongLogOrPass}</p>
            <Link to="/signup">{"Zarejestruj konto"}</Link>
            </Col>
          </Row>

        </Container>
        </section>
      );
    }
  

  export default Signin