import React, { useState, useContext, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ContextLogin } from '../components/ContextLogin';
import Section from '../components/Tasks/SectionForShowTask'

const ShowTasks = (props) => {
  const {isUserLogged} = useContext(ContextLogin)  
  const [tasks,setTasks] = useState([])
  const [deletedTask,setDeletedTask] = useState(false)
  const history = useHistory()
  const divRef = useRef()

  const getTasks = useCallback(() => {
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
        setTasks (response.data)
      })
      .catch(function (error) {
        console.log("error is ", error);
      });
  }
},[history]
)

  const handleDeleteTask = (e) => {
    e.preventDefault();
    const id = e.currentTarget.value
    if (window.confirm("jesteś pewien aby usunąć")) {
      axios({
        method: 'delete',
        url: '/tasks',
        params: {id}  
    })
        .then(function (response) {
          toggleDeletedTask()
        })
        .catch(function (error) {});
    }
     
  }

  const toggleDeletedTask = () => {
    setDeletedTask(prevValue => !prevValue)
  }

  const handleUpdateTask = (e) => {
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
    getTasks()
    return () => {divRef.current=false;}  
    },[getTasks,deletedTask]
    ) 

  useLayoutEffect(() => {
    document.getElementById('mainMenu').style.display='flex';
  },[])

   return (
         <div ref={divRef}> 
          {
             isUserLogged 
             ? 
             <>
             <Section tasks={tasks} 
             updateTask={handleUpdateTask} deleteTask={handleDeleteTask}/> 
            </>
            : 
             notLoggedInformation()
          }
        </div>         
        
      );

  }

  export default ShowTasks