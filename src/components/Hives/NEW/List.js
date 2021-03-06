import React, {useEffect} from 'react'
import Element from './Element'
import {connect} from 'react-redux'
import {getHives,clear} from './actions/hivesActions'
import {getApiarys} from './actions/apiarysActions'

const List = ({hives,apiarys,getHives,getApiarys,clear}) => {

    const handleSelect = (e) => {
        const apiaryID = e.target.value
        getHives(apiaryID)  
    }

    const Apiarys = apiarys.map((apiary, index) => {
        const {name,_id} = apiary
        return <option key={index} value={_id}>{name}</option>
    })

    const Elements = hives.map(hive => {
        if (hive._id)
        {
         return <Element key={hive._id} {...hive}/>
        }
        return null
        
    })

    const table = 
        (
            <div>
            <h5>Lista uli</h5>
            <form style={{"marginTop":"20px", "marginBottom":"20px"}}>
                <h6>Wybierz pasieke:</h6>
                <select
                onChange={handleSelect}
                className="form-control"
                id="pasieka"
                name="pasieka"
                placeholder="wybierz"
                >
                <option value=''>wybierz</option>
                    {Apiarys}
                <option value='all'>wszystkie</option>
                </select>
            </form>

            <table className="table table-striped table- mt-3">
                <thead className="thead thead-light">
                <tr>
                    <th>Nr</th>
                    <th>Typ</th>
                    <th>Status</th>
                    <th>edit</th>
                    <th>del</th>
                </tr>
                </thead>
                <tbody>
                 {Elements}    
                </tbody>
            </table> 
        </div>
    )

    useEffect(() => { 
        clear()
        getApiarys()
        return function cleanUp() {clear()}
        },[getApiarys,clear]  
    )

    return (
    <>
        {table}
    </>
    )
}

const connectReduxStateToProps = store => ({
    hives:store.hives,
    apiarys:store.apiarys
})

const connectActionsToProps = ({
    getHives,
    clear,
    getApiarys
  })

const ListHives = connect(connectReduxStateToProps,connectActionsToProps)(List)

export default ListHives
