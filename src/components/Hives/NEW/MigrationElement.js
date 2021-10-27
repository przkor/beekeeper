import React from 'react'
import {migrateHive} from './actions/hivesActions'
import {connect} from 'react-redux'
import { Archive } from 'react-bootstrap-icons';





const MigrationElement = ({_id,number,type,handleMoveHive}) => {

/*
    const handleCheckbox =  (e) => {
        const id = e.target.value
        if (e.target.checked === true) {
            handleSetCheckedHives(prev=>{
                return [...prev,id]}
                )
            }   
        else {
            handleSetCheckedHives(prev => {
                let index = prev.indexOf(id)
                let tablica = [...prev]
                tablica.splice(index,1)
                return tablica
            })
        }
        
    }
*/
    const handleMove= () => {
        handleMoveHive(_id,number)
    }
    return (
        
        <>
        <tr key={_id}>
            <td><span><Archive></Archive> {number}</span></td>
            <td>{type}</td>
            <td>
                 <button onClick={handleMove}>
                     <span>
                        <i className="fa fa-share"></i>
                     </span>
                </button>
            </td>
        </tr>
        </>       
    )
}

const connectActionsToProps = ({
    migrateHive
  })

const ElementWithReduxAction = connect(null,connectActionsToProps)(MigrationElement)
export default ElementWithReduxAction