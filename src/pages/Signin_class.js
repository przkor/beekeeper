import React, { Component } from 'react';
import axios from 'axios'
import {Link, Route,Redirect} from 'react-router-dom'


class Signin extends Component {
    constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        email: "",
        password: "",
        wrongLogOrPass: "", 
        logged: false
      };
    }
   
    signIn() {
      const self = this;
      
      axios
        .post("/signin", {
          email: this.state.email,
          password: this.state.password,
        })
        .then(function (response) {
          if (response.data === "success") {    
            self.props.handleLogged()
            self.setState({ logged:true  });
            
            
            //self.props.history.push("/events")
            return
        }
          if (response.data === "failure") {
            self.setState({
              wrongLogOrPass: "Błędny login lub hasło",
              email: "",
              password: "",
            });
            return
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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

    componentDidUpdate() {
      
      if (this.state.logged=== true)
      {
        console.log('Jestem w compnentDidUpdate');
        <Route render={() => (<Redirect to="/events"/>)}/>
      }

    }



    render() {
     
      return (
        <section>
        <div>
          <h4>Panel logowania</h4>
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <label htmlFor="inputEmail" className="sr-only">
              Adres email
            </label>
            <input autoFocus={true}
              type="email"
              onChange={this.handleEmailChange}
              id="inputEmail"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
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
              required
            />
  
            <button
              className="btn btn-lg btn-primary btn-block"
              onClick={this.signIn}
              type="button"
            >
              Zaloguj
            </button>
          </form>
          <div>
            <p>{this.state.wrongLogOrPass}</p>
            <Link to="/signup">{"Zarejestruj konto"}</Link>
          </div>
        </div>
        </section>
      );
    }
  }

  export default Signin