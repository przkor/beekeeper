import React, {useState,useEffect, useCallback} from 'react'
import FormAdd from './FormAdd'
import {del} from './actions/apiarysActions'
import {connect} from 'react-redux'
import axios from 'axios'
import PopUp  from '../Modal/ModalConfirmation' 



const Element = ({_id,name,location,del}) => {

    const [isVisibleForm,setIsVisibleForm]= useState(false)
    const [hivesAmount,setHivesAmount] = useState('')
    const [popUp,setPopUp] = useState({
        status:false,
        title:'',
        message:'',
        type:'',
      })

    const getHivesAmount = useCallback((_id) => {
        axios({
            method:'get',
            url:'/hives/getHivesAmountInApiary',
            params:{_id}
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            setHivesAmount(response.data.result)
        })
        .catch(function (error) {console.log(error);});
    },[]
    )

    const toggleEditButton = () => {      
        setIsVisibleForm(current=>!current)
    }

    const handleDelete = () => { 
        if (hivesAmount>0) {
            setPopUp({
                status:true,
                title:'Uwaga',
                message:'Nie można trwale usunąć pasieki gdy znajdują się w niej ule!',
                type:'warning',
            })
        }
        else {
            setPopUp({
                status:true,
                title:'Potwierdź',
                message:'Czy na pewno usunąć?',
                type:'danger',
            })
        }
    }

    const deleteApiary = () => {
        del(_id)
    }
    
    useEffect(()=>{
        getHivesAmount(_id)
      },[getHivesAmount,_id])


    const formElement = () => {
        if (isVisibleForm) {
            return (<FormAdd 
                _id={_id} 
                name={name} 
                location={location} 
                callback={toggleEditButton}
            />)
        }
    }


    const editButton = <button onClick={toggleEditButton}><span ><i className="fa fa-pencil fa-fw"></i></span></button>
    const deleteButton = <button onClick={handleDelete}><span><i className="fa fa-trash-o fa-lg"></i></span></button>
    return (
        <>
        <tr key={_id}>
            <td>{name}</td>
            <td>{location}</td>
            <td>{hivesAmount}</td>
            <td>{isVisibleForm? '' : editButton} {deleteButton}</td>
        </tr>
       <tr><td colSpan={4}>{formElement()}</td></tr>
       {          
            popUp.status 
            ? 
              <PopUp parameters={popUp} action={deleteApiary}
                callback={setPopUp}/> 
            : 
              null
          }   
        </>       
    )
}

const connectActionsToProps = ({
    del
  })

const ElementWithReduxAction = connect(null,connectActionsToProps)(Element)
export default ElementWithReduxAction