import React, { useState, useContext, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ContextLogin } from '../components/ContextLogin';
import Section from '../components/Tasks/SectionForShowTask'

const ShowEvents = (props) => {
  const {isUserLogged} = useContext(ContextLogin)  
  const [events,setEvents] = useState([])
  const [deletedEvent,setDeletedEvent] = useState(false)
  const history = useHistory()
  const divRef = useRef()

  const getEvent = useCallback(() => {
    if (divRef.current) 
    {
    axios
      .get('/tasks', {})
      .then(function (response) {
        if (response.data==="access denied")
        {   
         history.push("/")
         return 
        }
        setEvents (response.data)
      })
      .catch(function (error) {
        console.log("error is ", error);
      });
  }
},[history]
)

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    const id = e.currentTarget.value
    if (window.confirm("jesteś pewien aby usunąć")) {
      axios({
        method: 'delete',
        url: '/tasks',
        params: {id}  
    })
        .then(function (response) {
          toggleDeletedEvent()
        })
        .catch(function (error) {});
    }
     
  }

  const toggleDeletedEvent = () => {
    setDeletedEvent(prevValue => !prevValue)
  }

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    const id = e.currentTarget.value
    history.push(`/addTask/${id}`)
  }

  const handleRedirect= () => {
    const location = { 
      pathname: '/'
    }
     history.push(location)
   }

   const notLoggedInformation = () => 
    (
      <div>
        <p>Użytkownik nie jest zalogowany / brak dostępu</p>
        <button onClick={handleRedirect}>Zaloguj sie</button>
      </div>       
    ) 


  useEffect(()=> {
    divRef.current = true
    console.log(`Renderuje ShowEvents... `)
    getEvent()
    return () => {divRef.current=false; console.log("Czyszcze ShowEvents..")}  
    },[getEvent,deletedEvent]
    ) 

  useLayoutEffect(() => {
    document.getElementById('mainMenu').style.display='flex';
    console.log('Renderuje useLayoutEffect')
  },[])

   return (
         <div ref={divRef}> 
          {
             isUserLogged 
             ? 
             <>
             <Section events={events} 
             updateEvent={handleUpdateEvent} deleteEvent={handleDeleteEvent}/> 
            </>
            : 
             notLoggedInformation()
          }
        </div>         
        
      );

  }

  export default ShowEvents