import React, {useState} from 'react'
import FormEdit from './FormEdit'
import ShowInspection from './Inspection/ShowInspection'
import {delHive} from './actions/hivesActions'
import {connect} from 'react-redux'

const collection = 'hives'


const Element = ({_id,number,type,mother,motherYear,power,status,apiary,delHive}) => {

    const [isVisibleFormEdit,setIsVisibleFormEdit]= useState(false)
    const [isVisibleInspection,setIsVisibleInspection]= useState(false)

    const toggleInspectionButton = () => {      
        setIsVisibleInspection(current=>!current)
    }
    const toggleEditButton = () => {      
        setIsVisibleFormEdit(current=>!current)
    }

    const handleDelete = () => {  
        let id =_id
        if(window.confirm('Czy na pewno trwale usunąć')) {delHive(id,collection)}
    }

    const formEdit = () => {
        if (isVisibleFormEdit) {
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

    const inspection = () => {
        if (isVisibleInspection) {
            return (<ShowInspection
                hiveID={number}
                apiary = {apiary}
                callback={toggleInspectionButton}
            />)
        }
    }

    const inspectionButton = <button style={{margin:"4px"}} onClick={toggleInspectionButton}><span ><i className="fa fa-wrench" aria-hidden="true"></i></span></button>
    const editButton = <button style={{margin:"4px"}} onClick={toggleEditButton}><span ><i className="fa fa-pencil fa-fw"></i></span></button>
    const deleteButton = <button style={{margin:"4px"}} onClick={handleDelete}><span><i className="fa fa-trash-o fa-lg"></i></span></button>

    return (
        <>
        <tr key={_id} >
            <td>{number}</td>
            <td>{type}</td>
            <td>{status}</td>
            <td >
                {isVisibleInspection ? '' : inspectionButton}
                {isVisibleFormEdit ? '' : editButton}
                {deleteButton}
            </td>
        </tr>
        {isVisibleFormEdit ? 
            <tr><td colSpan={4} className="text-center">{formEdit()}</td></tr>
            :
            null
        }
        {isVisibleInspection ? 
            <tr>
                <td colSpan={4} className="text-center">
                    <div style={{maxWidth:"500px"}}>
                     {inspection()}
                    </div>
                </td>
            </tr>
            :
            null
        }
        </>       
    )
}

const connectActionsToProps = ({
    delHive
  })

const ElementWithReduxAction = connect(null,connectActionsToProps)(Element)
export default ElementWithReduxAction