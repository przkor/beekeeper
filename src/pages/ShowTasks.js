import React, { useState, useContext, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ContextLogin } from '../components/ContextLogin';
import Section from '../components/Tasks/SectionForShowTask'

const ShowTasks = (props) => {
  const {isUserLogged} = useContext(ContextLogin)
  const [apiarys,setApiarys] = useState([])  
  const [apiary,setApiary] = useState('all')  
  const [tasks,setTasks] = useState([])
  const [deletedTask,setDeletedTask] = useState(false)
  const history = useHistory()
  const divRef = useRef()

  const getTasksAndApiarys = useCallback(() => {
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

      axios
      .get('/apiarys', {})
      .then(function (response) {
        if (response.data==="access denied")
        {   
         history.push("/")
         return 
        }
        setApiarys(response.data)
      })
      .catch(function (error) {
        console.log("error is ", error);
      });
  }
},[history]
)

const apiarysList = () => {
  if(apiarys.length>0) {
    const list = apiarys.map((apiary) => (
      <option key={apiary._id} value={apiary.name}>{apiary.name}</option>
    ))
    return list
  }
  return
} 

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

  const handleApiaryChange = (e) => {
    setApiary(e.target.value);
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
    getTasksAndApiarys()
    return () => {divRef.current=false;}  
    },[getTasksAndApiarys,deletedTask]
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
              
              <div className="form-group">
                <form>
              <label htmlFor="apiary" className="left"><b>Lista zadań:</b></label>
                <span className="left2">
                  <select
                    value={apiary || 'all'}
                    onChange={handleApiaryChange}
                    className="form-control"
                    id="apiary"
                    name="apiary"
                  >
                  <option value='all'>wszystkie</option>
                  {apiarysList()}
                  </select>
                </span>
                </form>
              </div>
             <Section tasks={tasks} apiary={apiary} 
             updateTask={handleUpdateTask} deleteTask={handleDeleteTask}/> 
            </>
            : 
             notLoggedInformation()
          }
        </div>         
        
      );

  }

  export default ShowTasks