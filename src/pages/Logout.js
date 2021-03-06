import {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import { ContextLogin } from '../components/ContextLogin';

const Logout = () => {

  let {cleanUsername, toggleUserLogged} = useContext(ContextLogin)
  const history = useHistory()
  
  useEffect(()=> {
    
    logout()
    return (()=>{toggleUserLogged(false) 
      cleanUsername()
    })
  
  }
 
  ) 

  const logout = () => {
        axios
        .post("/logout", {})
        .then(function (response) {
          if (response.data === true) {
            
            history.push("/")
            
          }
          if (response.data === false) {
            console.log("Nie zadziałało wylogowanie");
          }
        })
        .catch(function (error) {
          console.log("error is ", error);
        })
    }

  
     return (<></>)
}
export default Logout