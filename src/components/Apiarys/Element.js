import React, {useState,useEffect, useCallback} from 'react'
import FormAdd from './FormAdd'
import {del} from './actions/apiarysActions'
import {connect} from 'react-redux'
import axios from 'axios'

const collection = 'apiary'

const Element = ({_id,name,location,del}) => {

    const [isVisibleForm,setIsVisibleForm]= useState(false)
    const [hivesAmount,setHivesAmount] = useState('')
    const getHivesAmount = useCallback((_id) => {
            axios
            .post("/getHivesAmountInApiary", {
                _id
            })
            .then(function (response) {
                if (response.data==="access denied")
                {
                    window.location.assign('/');
                    return
                }
                console.log(response.data.result)
                setHivesAmount(response.data.result)
            })
            .catch(function (error) {
               console.log(error);
            });
    },[]
    )

    const toggleEditButton = () => {      
        setIsVisibleForm(current=>!current)
    }

    const handleDelete = () => { 
        del(_id,collection)
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
    const deleteButtonBlocked = <button><span><i className="bi bi-bag-x bi-lg"></i></span></button>
    return (
        <>
        <tr key={_id}>
            <td>{name}</td>
            <td>{location}</td>
            <td>{hivesAmount}</td>
            <td>{isVisibleForm? '' : editButton}</td>
            <td>{hivesAmount? deleteButtonBlocked : deleteButton}</td>
        </tr>
       <tr><td colSpan={4}>{formElement()}</td></tr>
        </>       
    )
}

const connectActionsToProps = ({
    del
  })

const ElementWithReduxAction = connect(null,connectActionsToProps)(Element)
export default ElementWithReduxAction