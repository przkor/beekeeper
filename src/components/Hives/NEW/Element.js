import React, {useState} from 'react'
import FormEdit from './FormEdit'
import {delHive} from './actions/hivesActions'
import {connect} from 'react-redux'

const collection = 'hives'

const Element = ({_id,number,type,mother,motherYear,power,status,apiary,delHive}) => {

    const [isVisibleForm,setIsVisibleForm]= useState(false)

    const toggleEditButton = () => {      
        setIsVisibleForm(current=>!current)
    }

    const handleDelete = () => {   
        let id =_id 
        delHive(id,collection)
    }

    const formElement = () => {
        if (isVisibleForm) {
            return (<FormEdit 
                _id={_id} 
                number={number} 
                type={type} 
                mother={mother}
                motherYear={motherYear}
                power={power}
                status={status}
                apiary={apiary}
                callback={toggleEditButton}
            />)
        }
    }


    const editButton = <button onClick={toggleEditButton}><span ><i className="fa fa-pencil fa-fw"></i></span></button>
    const deleteButton = <button onClick={handleDelete}><span><i className="fa fa-trash-o fa-lg"></i></span></button>

    return (
        <>
        <tr key={_id}>
            <td>{number}</td>
            <td>{type}</td>
            <td>{power}</td>
            <td>{isVisibleForm? '' : editButton}</td>
            <td>{deleteButton}</td>
        </tr>
        <tr><td colSpan={5}>{formElement()}</td></tr>
        </>       
    )
}

const connectActionsToProps = ({
    delHive
  })

const ElementWithReduxAction = connect(null,connectActionsToProps)(Element)
export default ElementWithReduxAction