import React, {useEffect, useState} from 'react'
import MigrationElement from './MigrationElement'
import {connect} from 'react-redux'
import {doMigrateHives, getHives, migrateHive} from './actions/hivesActions'
import {getApiarys} from './actions/apiarysActions'
import {Alert} from 'react-bootstrap'


const List = ({hives,apiarys,getHives,getApiarys,migrateHive,doMigrateHives}) => {

    const [apiaryFrom,setApiaryFrom] = useState('')
    const [apiaryTo,setApiaryTo] = useState('')
    const [migrateList,setMigrateList] = useState([])
    const [changeConfirmation,setChangeConfirmation] = useState('')
    
    const handleSelectApiaryFrom = (e) => {
        const apiaryId = e.target.value
        setChangeConfirmation('')
        getHives(apiaryId)  
        setApiaryFrom(apiaryId)
        setApiaryTo('')
        setMigrateList([])
        
    }

    const handleSelectApiaryTo = (e) => {
        const apiaryId = e.target.value
        setChangeConfirmation('')
        setApiaryTo(apiaryId)
    }

    const handleMoveHive = (_id,number) => {
        const hiveID = _id
        const hiveNumber = number
        setChangeConfirmation('')
        setMigrateList(prev=>{
            const table = [...prev]
            table.push(hiveNumber)
            return table
        })
        migrateHive(hiveID)
    }

    const handleClearMigrateList =() => {
        setMigrateList([])
    }

    const handleDoMigrate = () => {
        if (apiaryTo==='') {
            setChangeConfirmation('Wybierz pasieke do której migrujesz')
            return
        }
       doMigrateHives(migrateList,apiaryTo,handleClearMigrateList,setChangeConfirmation)
    }

    const handleCancleMigrate = () => {
        handleClearMigrateList()
        getHives(apiaryFrom)
    }

    

    


    const ApiarysFrom = apiarys.map((apiary, index) => {
        const {name,_id} = apiary
        return <option key={index} value={_id}>{name}</option>
    })

    const ApiarysTo = apiarys.map((apiary, index) => {
        const {name,_id} = apiary
        if (_id!==apiaryFrom) {return <option key={index} value={_id}>{name}</option>}
        else {return null}
    })


    const Elements = hives.map(hive => {
        if (hive._id)
        {
         return <MigrationElement key={hive._id} {...hive} handleMoveHive={handleMoveHive}  />
        }
        return null
        
    })



    const noHivesToShow = (
        <div>
            <p>Brak uli</p>
        </div>
    )

    const noApiarysToShow = (
        <div>
            <p>Brak pasiek w bazie</p>
        </div>
    )
    const apiarysListFrom = (
        <div>
            <form style={{"marginTop":"20px", "marginBottom":"20px"}}>
                <h6>Wybierz pasieke:</h6>
                <select
                onChange={handleSelectApiaryFrom}
                className="form-control"
                id="pasieka"
                name="pasieka"
                placeholder="wybierz"
                >
                <option value=''>wybierz</option>
                    {ApiarysFrom}
                </select>
            </form>
        </div>
    )

    const apiarysListTo = (
        <div>
            <form style={{"marginTop":"20px", "marginBottom":"20px"}}>
                <h6>Migracja do pasieki:</h6>
                <select
                onChange={handleSelectApiaryTo}
                className="form-control"
                id="pasieka"
                name="pasieka"
                placeholder="wybierz"
                >
                <option value=''>wybierz</option>
                    {ApiarysTo}
                </select>
            </form>
        </div>
    )

    const showMigrateList = migrateList.map(element=> {
            return <li key={element}>Ul nr: {element}</li>   
    })

    const migrateButttons = 
        <>
            <button onClick={handleDoMigrate} style={{padding:'5px', margin:'5px'}}>Zatwierdź</button>
            <button onClick={handleCancleMigrate} style={{padding:'5px', margin:'5px'}}>Wyczyść</button>
        </>
    


    const hivesList = 
        (
        <div>
             <table className="table table-striped table- mt-3">
                <thead className="thead thead-light">
                <tr>
                    <th>Nr</th>
                    <th>Typ</th>
                    <th>Przenieś</th>
                </tr>
                </thead>
                <tbody>
                 {Elements}    
                </tbody>
            </table> 
        </div>
    )

    useEffect(() => { 
        getApiarys()
        return function cleanUp() {}
        },[getApiarys]  
    )
    
    return (
        
        <div>
            <div style={{float:'left', width:"60%", paddingRight:'3px'}}> 
                {apiarys.length>0 ? apiarysListFrom : noApiarysToShow}
                {hives.length>0 ? hivesList : noHivesToShow}     
            </div>
            <div style={{float:'left', width:"40%" ,  paddingLeft:'3px'}}> 
                {apiarys.length>0 ? apiarysListTo : noApiarysToShow}
                {migrateList.length>0 ? migrateButttons : null}
                <div style={{width:"100%"}}>
                    <ul>{showMigrateList}</ul>
                    {changeConfirmation? <Alert variant="success">
                      <p>{changeConfirmation}</p></Alert> 
                      :
                      null
                    }
                </div>
            </div>
            <div style={{clear:'both'}}> </div>
        </div>
    )
}

const connectReduxStateToProps = store => ({
    hives:store.hives,
    apiarys:store.apiarys,
})

const connectActionsToProps = ({
    getHives,
    getApiarys,
    migrateHive,
    doMigrateHives
  })

const ListHives = connect(connectReduxStateToProps,connectActionsToProps)(List)

export default ListHives