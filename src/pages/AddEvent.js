import React, {useCallback, useEffect, useRef, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ContextLogin } from '../components/ContextLogin';
import Section from '../components/SectionForAddEvent'

const AddEvent = (props) => {
  
  const eventID= props.match.params.id
  const {isUserLogged} = useContext(ContextLogin)  
  let [title,setTitle] = useState("")
  let [subject,setSubject] = useState("")
  let [id,setID] = useState("")
  const divRef = useRef()
  const history = useHistory()

  const addEvent = () => { 
    axios
      .post("/addEvent", {
          title, 
          subject,
          id,
        })
        .then(function (response) {
          history.push("/events")
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
 
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    }
    const handleSubjectChange = (e) => {
      setSubject(e.target.value);
    }  

    const getEventWithId = useCallback(() => {
      if (eventID !== undefined && eventID!==null) {
       axios
        .post("/getEventWithId", {
            id: eventID,
          })
        .then(function (response) {
            if (response) {
              setTitle(response.data.title);
              setSubject(response.data.subject);
              setID(response.data._id);
            }
          })
          .catch(function (error) {
            console.log("error is ", error);
          });
      }
    },[eventID])

  useEffect(()=>{getEventWithId()},[getEventWithId]) 

  const handleRedirect= () => {
    const location = { 
      pathname: '/'
    }
     history.push(location)
   }

  const notLoggedInformation = () => (
    <div>
      <p>Użytkownik nie jest zalogowany / brak dostępu</p>
      <button onClick={handleRedirect}>Zaloguj sie</button>
    </div>       
    ) 

  return (
    <div ref={divRef}> 
          {
             isUserLogged 
             ? 
             <Section handleTitleChange = {handleTitleChange} title ={title} 
                  handleSubjectChange = {handleSubjectChange} subject = {subject}
              addEvent={addEvent}
            /> 
            : 
             notLoggedInformation()
          }
        </div>  
  )
  }

  export default AddEvent