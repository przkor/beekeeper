import React, {useEffect, useState} from 'react'
import MigrationElement from './MigrationElement'
import {connect} from 'react-redux'
import {getHives, migrateHive} from './actions/hivesMigrationActions'
import {getApiarys} from './actions/apiarysActions'

const List = ({hives1,hives2,apiarys,getHives,getApiarys,migrateHive}) => {
    const [apiary1ID,setApiary1ID] = useState()
    const [apiary2ID,setApiary2ID] = useState()

    const handleSelectApiary1 = (e) => {
        const apiaryID = e.target.value
        //tab - pasieka z lewej strony
        const tab=1
        getHives(apiaryID,tab)  
        setApiary1ID(apiaryID)
    }
    const handleSelectApiary2 = (e) => {
        const apiaryID = e.target.value
        //tab - pasieka z prawej strony
        const tab=2
        getHives(apiaryID,tab) 
        setApiary2ID(apiaryID) 
    }

    const handleMigration1 = (id) => {
        const tab=1
        const apiaryID = apiary1ID
        migrateHive(id,apiaryID,tab)
    }

    const handleMigration2 = (id) => {
        const tab=2
        const apiaryID = apiary2ID
        migrateHive(id,apiaryID,tab)
    }


    const Apiarys1 = apiarys.map((apiary, index) => {
        const {name,_id} = apiary
        return <option key={index} value={_id}>{name}</option>
    })

    const Apiarys2 = apiarys.map((apiary, index) => {
        const {name,_id} = apiary
        return <option key={index} value={_id}>{name}</option>
    })

    const Elements1 = hives1.map(hive => {
        if (hive._id)
        {
         return <MigrationElement key={hive._id} {...hive} handleMigration={handleMigration1} />
        }
        return null
        
    })

    const Elements2 = hives2.map(hive => {
        if (hive._id)
        {
         return <MigrationElement key={hive._id} {...hive} handleMigration={handleMigration2} />
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
    const apiarysList1 = (
        <div>
            <h5>Lista uli</h5>
            <form style={{"marginTop":"20px", "marginBottom":"20px"}}>
                <h6>Wybierz pasieke:</h6>
                <select
                onChange={handleSelectApiary1}
                className="form-control"
                id="pasieka"
                name="pasieka"
                placeholder="wybierz"
                >
                <option value=''>wybierz</option>
                    {Apiarys1}
                </select>
            </form>
        </div>
    )

    const apiarysList2 = (
        <div>
            <h5>Lista uli</h5>
            <form style={{"marginTop":"20px", "marginBottom":"20px"}}>
                <h6>Wybierz pasieke:</h6>
                <select
                onChange={handleSelectApiary2}
                className="form-control"
                id="pasieka"
                name="pasieka"
                placeholder="wybierz"
                >
                <option value=''>wybierz</option>
                    {Apiarys2}
                </select>
            </form>
        </div>
    )

    const hivesList1 = 
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
                 {Elements1}    
                </tbody>
            </table> 
        </div>
    )

    const hivesList2 = 
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
                 {Elements2}    
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
            <div style={{float:'left', width:"50%", paddingRight:'5px'}}> 
                {apiarys.length>0 ? apiarysList1 : noApiarysToShow}
                {hives1.length>0 ? hivesList1 : noHivesToShow}     
            </div>
            <div style={{float:'left', width:"50%" ,  paddingLeft:'5px'}}> 
                {apiarys.length>0 ? apiarysList2 : noApiarysToShow}
                {hives2.length>0 ? hivesList2 : noHivesToShow}     
            </div>
        </div>
    )
}

const connectReduxStateToProps = store => ({
    hives1:store.hives1,
    hives2:store.hives2,
    apiarys:store.apiarys,
})

const connectActionsToProps = ({
    getHives,
    getApiarys,
    migrateHive
  })

const ListHives = connect(connectReduxStateToProps,connectActionsToProps)(List)

export default ListHives
