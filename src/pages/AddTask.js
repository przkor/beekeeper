import React, {useCallback, useEffect, useRef, useState, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ContextLogin } from '../components/ContextLogin';
import Section from '../components/Tasks/SectionForAddTask'
import PopUp from '../components/Modal/Modal'

const AddTask = (props) => {
  let hiveID = null
  if (props.hiveID !==undefined) {hiveID=`Ul nr ${props.hiveID}`}
  let apiaryID = null
  if (props.apiary!==undefined) {apiaryID=props.apiary}
  let taskID = null
  if (props.match) {taskID = props.match.params.id}
  const {isUserLogged} = useContext(ContextLogin)   
  const [data,setData] = useState({
    id:taskID,
    title:hiveID,
    subject:'',
    apiary:'',
    date:''
  })
  const [popUp,setPopUp] = useState({
    status:false,
    title:'',
    message:'',
    type:''
  })

  const divRef = useRef()

  const history = useHistory()

  const addEvent = () => { 
    if (divRef.current) {
      axios
      .post("/tasks", {
          data
        })
        .then(function (response) {
          //history.push("/tasks")
          if ((response.status===200)||(response.status===201)) {
            setPopUp
            ({
              status:true,
              title:'Potwierdzenie',
              message:'Dodano lub zaktualizowano zadanie',
              type:'confirmation'
           })
           setData({
            id:'',
            title:'',
            subject:'',
            apiary:'',
            date:''
           })
          }
          else {
            setPopUp
            ({
              status:true,
              title:'Ostrzeżenie!',
              message:'Coś poszło nie tak',
              type:'warning'
           })

          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  
 
    const handleTitleChange = (e) => {
      setData(prevData => {
        return {
          ...prevData, 
          title: e.target.value, 
        }
      })
    }

    const handleSubjectChange = (e) => {
      setData(prevData => {
        return {
          ...prevData, 
          subject: e.target.value, 
         
        }
      })
    }  

    const handleDateChange = (e) => {
      setData(prevData => {
        return {
          ...prevData, 
          date: e.target.value, 
         
        }
      })
    }

    const handleApiaryChange = (e) => {
      setData(prevData => {
        return {
          ...prevData, 
          apiary: e.target.value, 
        }
      })
    }

    const getEventWithId = useCallback(() => {
      if (taskID !== undefined && taskID !==null && divRef.current) {
        axios({
          method:'get',
          url:'/tasks',
          params: {taskID}
        })
        .then(function (response) {
            if (response.status===200) {
              setData({
                id:response.data._id,
                title:response.data.title,
                subject:response.data.subject,
                apiary:response.data.apiary,
                date:response.data.date
              })
            }
          })
          .catch(function (error) {
            console.log("error is ", error);
          });
      }
    },[taskID])

  useEffect(
    ()=>{
      divRef.current=true
      getEventWithId()
      return function cleanup() {
        divRef.current=false
      }
    },
    [getEventWithId]) 

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
             <Section handleTitleChange = {handleTitleChange} 
                handleSubjectChange = {handleSubjectChange} 
                handleDateChange = {handleDateChange} 
                handleApiaryChange = {handleApiaryChange} 
                data = {data}
                apiaryID={apiaryID}
                addEvent={addEvent}
            /> 
            : 
             notLoggedInformation()
          }
          {          
            popUp.status 
              ? 
                <PopUp parameters={popUp}
                  callback={setPopUp}/> 
              : 
                null
          }
    </div>  
  )
  }

  export default AddTask