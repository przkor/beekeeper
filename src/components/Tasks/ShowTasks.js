import React, { useState, useContext, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ContextLogin } from '../ContextLogin';
import SectionTasks from './SectionForShowTasks'
import Container from 'react-bootstrap/Container'
import PopUp from '../Modal/ModalConfirmation'

const ShowTasks = (props) => {
  const {isUserLogged} = useContext(ContextLogin)
  const [apiarys,setApiarys] = useState([])  
  const [apiary,setApiary] = useState('all')  
  const [tasks,setTasks] = useState([])
  const [deletedTask,setDeletedTask] = useState(false)
  const history = useHistory()
  const divRef = useRef()

  const [taskID,setTaskID] = useState('')
  const [popUp,setPopUp] = useState({
    status:false,
    title:'',
    message:'',
    type:'',
  })

  const getTasksAndApiarys = useCallback(() => {
    if (divRef.current) 
    {
    axios
      .get('/tasks', {params:{status:1}})
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
      <option key={apiary._id} value={apiary._id}>{apiary.name}</option>
    ))
    return list
  }
  return
} 

const handleDeleteModal = (e) => {
  e.preventDefault();
  const id = e.currentTarget.value
  setTaskID(id)
  setPopUp
            ({
              status:true,
              title:'Ostrzeżenie',
              message:'Czy na pewno usunąć?',
              type:'danger',
           })
}

  const handleDeleteTask = () => {
    const id = taskID
      axios({
        method: 'delete',
        url: '/tasks',
        params: {id}
    })
        .then(function (response) {
          if (response.data===true) {
            toggleDeletedTask()
            setPopUp
            ({
              status:false,
              title:'',
              message:'',
              type:'',
           })
          }
          else {
            alert('Błąd ! Nie usunięto')
          }
          
        })
        .catch(function (error) {});
  }

  const handleFinishTask = (e) => {
    const id = e.currentTarget.value
      axios({
        method: 'patch',
        url: '/tasks',
        data: {id}
    })
        .then(function (response) {
          toggleDeletedTask()
        })
        .catch(function (error) {});
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

    useLayoutEffect(() => {
        document.getElementById('showTasks').className='nav-link active';
        document.getElementById('showHistorycalTasks').className='nav-link';
      },[])

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
     <Container fluid ref={divRef}>
          {
             isUserLogged 
             ? 
             <> 
             <p></p> 
             <h5>Lista aktywnych zadań</h5>    
             {
              tasks.length<=0 ? (<b> brak zadań do wyświetlenia</b>) :
              (
                <>
              <form>
                <div className="form-group">
                    <select
                      value={apiary || 'all'}
                      onChange={handleApiaryChange}
                      className="form-control"
                      id="apiary"
                      name="apiary"
                    >
                    <option value='all'>wszystkie</option>
                    <option value='noassignment'>bez przypisania</option>
                      {apiarysList()}
                    </select>
                </div>
              </form>  
              <SectionTasks tasks={tasks} apiary={apiary} finishTask={handleFinishTask}
              updateTask={handleUpdateTask} deleteTask={handleDeleteModal}/>
              </>
              )}
            </>
            : 
             notLoggedInformation()
          }
          {          
            popUp.status 
              ? 
                <PopUp parameters={popUp} action={handleDeleteTask}
                  callback={setPopUp}/> 
              : 
                null
          }     
      </Container> 
      );

  }

  export default ShowTasks