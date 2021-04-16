import  React, {hashHistory, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { ContextLogin, defaultObject } from './ContextLogin';

//import axios from 'axios'

import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import ShowTasks from '../pages/ShowTasks'
import AddTask from '../pages/AddTask'
import Managers from '../pages/Managers'
import ManagerPage from '../pages/ManagerPage' 
import Logout from '../pages/Logout'
import MainNavigation from './MainNavigation'
import ShowUsername from './ShowUsername';



const ErrorPage = () => {
  return (<div><h4>Strona nie istnieje</h4></div>)
} 


const App = () => { 

    const [isUserLogged, setIsUserLogged] = useState(defaultObject.isUserLogged)
    const [username, setUsername] = useState(defaultObject.username)

    const toggleUserLogged = (value) => {
        setIsUserLogged(value)
    }
    const changeUsername = (username) =>
    {
      setUsername(username)
    }
    const cleanUsername = () => {
      setUsername('')
    }
/*
    const login = () => {

        axios
            .post("/getUsername")
             .then(function (response) 
             {
                if (response.data!=="failure") {     
                     const user = response.data 
                     setIsUserLogged(true) 
                     setUsername(user)
                     document.getElementById('username').innerHTML=`Zalogowany: ${user}`  

                     return        
                }
                if (response.data === "failure") {
                    setIsUserLogged(defaultObject.isUserLogged)
                    setUsername(defaultObject.username)
                    return
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }   

  */
  return (
    <Router basename={process.env.PUBLIC_URL} history={hashHistory}> 
    <ContextLogin.Provider value={
            {
               isUserLogged,
               toggleUserLogged,
               username,
               changeUsername,
               cleanUsername,
            }
        }>   
       <div className="App">
         <ShowUsername username={username}/>
         <aside>
       <MainNavigation/>
       </aside> 
       <section>
       <Switch>
          <Route path="/" exact><Signin/></Route>
          <Route path="/signin"><Signin/></Route>
          <Route path="/signup"  component={Signup}/>
          <Route path="/tasks"><ShowTasks /></Route>
          <Route path="/addTask/:id"  component={AddTask}/>
          <Route path="/addTask"  component={AddTask}/>
          <Route path="/managers"  component={Managers}/>
          <Route path="/manager/:option"  component={ManagerPage}/>
          <Route path="/logout"  component={Logout}/>
          <Route component={ErrorPage}/>     
      </Switch>
      </section>
    </div>
    </ContextLogin.Provider> 
    </Router>
  );
}

export default App;
