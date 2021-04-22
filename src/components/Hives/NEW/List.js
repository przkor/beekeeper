import React, {useEffect,useState} from 'react'
import Element from './Element'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
import {getHives,clear} from './actions/hivesActions'
import {getApiarys} from './actions/apiarysActions'
import axios from 'axios'

const List = ({hives,apiarys,getHives,getApiarys,clear}) => {
    
    const [hivesAmount,setHivesAmount] = useState(0)

    const getHivesAmountInApiary = (apiaryID) => {
        const _id = apiaryID
        axios({
            method:'get',
            url:'/hives/getHivesAmountInApiary',
            params:{_id}
        }).then(function(response){
            console.log(response.data.result)
            setHivesAmount(response.data.result)
        }).catch(function (error) {
            console.log(error);
         });
    }
    const handleSelect = (e) => {
        const apiaryID = e.target.value
        getHives(apiaryID) 
        getHivesAmountInApiary(apiaryID) 
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
    const apiarysList = (
        <div>
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
        </div>

    )
    const hivesList = 
        (
        <div className="table-responsive container-for-table" >
            <h5>Liczba rodzin pszczelich: {hivesAmount}</h5>
            <Table bordered  size="sm">
                <thead className="thead thead-light">
                <tr>
                    <th>ID</th>
                    <th>Typ</th>
                    <th>Status</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                 {Elements}    
                </tbody>
            </Table>
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
        {apiarys.length>0 ? apiarysList : noApiarysToShow}
        { hives.length>0 ? hivesList : noHivesToShow}
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
