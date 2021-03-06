import React, {useState} from 'react'
import FormAdd from './FormAdd'
import {del} from './actions/treatmentActions'
import {connect} from 'react-redux'

const collection = 'treatment'

const Element = ({_id,name,producer,dosage,del}) => {

    const [isVisibleForm,setIsVisibleForm]= useState(false)

    const toggleEditButton = () => {      
        setIsVisibleForm(current=>!current)
    }

    const handleDelete = () => { 
        console.log('Kliknięto delete')     
        del(_id,collection)
    }

    const formElement = () => {
        if (isVisibleForm) {
            return (<FormAdd 
                _id={_id} 
                name={name} 
                producer={producer} 
                dosage={dosage}
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
            <td>{producer}</td>
            <td>{dosage}</td>
            <td>{isVisibleForm? '' : editButton}</td>
            <td>{deleteButton}</td>
        </tr>
       <tr><td colSpan={5}>{formElement()}</td></tr>
        </>       
    )
}

const connectActionsToProps = ({
    del
  })

const ElementWithReduxAction = connect(null,connectActionsToProps)(Element)
export default ElementWithReduxAction