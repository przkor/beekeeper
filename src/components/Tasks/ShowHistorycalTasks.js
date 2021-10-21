import React, { useState, useContext, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ContextLogin } from '../ContextLogin';
import SectionForHistorycalTasks from './SectionForHistorycalTasks'
import Container from 'react-bootstrap/Container'

const ShowHistorycalTasks = (props) => {
  const {isUserLogged} = useContext(ContextLogin)
  const [apiarys,setApiarys] = useState([])  
  const [apiary,setApiary] = useState('all')  
  const [tasks,setTasks] = useState([])
  const [loading,setLoading] = useState(false)

  const history = useHistory()
  const divRef = useRef()


  const getTasksAndApiarys = useCallback(() => {
    setLoading(true)
    if (divRef.current) 
    {
    axios
      .get('/tasks', { params: {status:0}  })
      .then(function (response) {
        if (response.data==="access denied")
        {   
         history.push("/")
         return 
        }
        setLoading(false)
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
        document.getElementById('showTasks').className='nav-link';
        document.getElementById('showHistorycalTasks').className='nav-link active';
      },[])


  useEffect(()=> {
    divRef.current = true
    getTasksAndApiarys()
    return () => {divRef.current=false;}  
    },[getTasksAndApiarys]
    ) 


   return (
     <Container fluid ref={divRef}>
          {
             isUserLogged 
             ? 
             <>  
             <p></p>
             <h6>Lista zakończonych zadań</h6>    
             {
              loading
              ?
              <p>Ładowanie...</p> 
              :
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
              <SectionForHistorycalTasks tasks={tasks} apiary={apiary}/>
              </>
              )}
            </>
            : 
             notLoggedInformation()
          }
      </Container> 
      );

  }

  export default ShowHistorycalTasks