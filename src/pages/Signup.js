import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Container,Col,Row} from 'react-bootstrap'

class Signup extends Component {
    constructor(props) {
      super(props);
      this.signUp = this.signUp.bind(this);
      this.handleLoginChange = this.handleLoginChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        login: '',
        name: '',
        email: '',
        password: '',
        confirmation: '',
      };
    }
    handleNameChange(e) {
      this.setState({ name: e.target.value });
    }
    handleLoginChange(e) {
      this.setState({ login: e.target.value });
    }
    handleEmailChange(e) {
      this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }
    handleSubmit = (e) => {
      e.preventDefault()
  }
  componentDidMount() {
    document.getElementById('mainMenu').style.display='none'
  }

    signUp() {
     const self = this;
      axios
        .post("/user/signup", {
          login: this.state.login,
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        })
        .then(function (response) {
          if (response.data === "success") {
            self.setState({
              login: '',
              name: '',
              email: '',
              password: '',
              confirmation: 'Rejestrację się powiodła. Możesz się zalogować'
            });
          } 
          else if (response.data==='access denied') {console.log('Dostęp wzbroniony')}
          else {
            self.setState({
              name: "",
              email: "",
              password: "",
              confirmation: "Rejestrację się NIE powiodła. Spróbuj jeszcze raz",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() {
   
      return (
        <section>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={6} sm={9}>
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h2 className="form-signin-heading">Zarejestruj się:</h2>
            <label htmlFor="inputLogin" className="sr-only">
              Login
            </label>
            <input
              type="text"
              onChange={this.handleLoginChange}
              id="inputLogin"
              value={this.state.login}
              className="form-control"
              placeholder="Login"
              autoComplete="username"
              required
              autoFocus
            />
            <label htmlFor="inputName" className="sr-only">
              Imie
            </label>
            <input
              type="text"
              onChange={this.handleNameChange}
              id="inputName"
              value={this.state.name}
              className="form-control"
              autoComplete="name"
              placeholder="Imie"
              required
            />
            <label htmlFor="inputEmail" className="sr-only">
              Adres email
            </label>
            <input
              type="email"
              onChange={this.handleEmailChange}
              id="inputEmail"
              value={this.state.email}
              className="form-control"
              autoComplete="email"
              placeholder="E-mail"
              required
            />
            <label htmlFor="inputPassword" className="sr-only">
              Hasło
            </label>
            <input
              type="password"
              onChange={this.handlePasswordChange}
              id="inputPassword"
              value={this.state.password}
              className="form-control"
              placeholder="Hasło"
              autoComplete="new-password"
              required
            />
            <button
              className="btn btn-lg btn-primary btn-block"
              onClick={this.signUp}
              type="button"
            >
              Zarejestruj
            </button>
          </form>
          </Col>
          </Row>
          <div>
            <h4>{this.state.confirmation}</h4>
          </div>
          <div>
            <Link to="/signin">{"Zaloguj"}</Link>
          </div>
        </Container>
        </section>
      );
    }
  }

  export default Signup