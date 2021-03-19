import React from 'react'
import {migrateHive} from './actions/hivesMigrationActions'
import {connect} from 'react-redux'


const MigrationElement = ({_id,number,type,handleMigration}) => {

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
    const migrationButton = <button onClick={handleMigration(_id)}>
        <span>
        <i className="fa fa-share"></i>
        </span>
        </button>

    return (
        
        <>
        <tr key={_id}>
            <td>{number}</td>
            <td>{type}</td>
            <td>{migrationButton}</td>
        </tr>
        </>       
    )
}

const connectActionsToProps = ({
    migrateHive
  })

const ElementWithReduxAction = connect(null,connectActionsToProps)(MigrationElement)
export default ElementWithReduxAction