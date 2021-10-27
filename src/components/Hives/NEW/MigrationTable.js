import React, {useEffect, useState} from 'react'
import MigrationElement from './MigrationElement'
import {useDispatch, useSelector} from 'react-redux'
import {doMigrateHives, getHives, migrateHive} from './actions/hivesActions'
import {getApiarys} from './actions/apiarysActions'
import {Alert, Container,Col,ListGroup,Row, Button} from 'react-bootstrap'
import { ArchiveFill } from 'react-bootstrap-icons';


const List = () => {

    const [apiaryFrom,setApiaryFrom] = useState('')
    const [apiaryTo,setApiaryTo] = useState('')
    const [migrateList,setMigrateList] = useState([])
    const [changeConfirmation,setChangeConfirmation] = useState({
        variant:'success',
        message:''
    })

    const dispatch = useDispatch()
    const hives = useSelector(store=>store.hives)
    const apiarys = useSelector(store=>store.apiarys)
    
    const handleSelectApiaryFrom = (e) => {
        const apiaryId = e.target.value
        setChangeConfirmation(prev=>({ variant:prev.variant , message:''}))
        dispatch(getHives(apiaryId))  
        setApiaryFrom(apiaryId)
        setApiaryTo('')
        setMigrateList([])
        
    }

    const handleSelectApiaryTo = (e) => {
        const apiaryId = e.target.value
        setChangeConfirmation(prev=>({ variant:prev.variant , message:''}))
        setApiaryTo(apiaryId)
    }

    const handleMoveHive = (_id,number) => {
        const hiveID = _id
        const hiveNumber = number
        setChangeConfirmation(prev=>({ variant:prev.variant , message:''}))
        setMigrateList(prev=>{
            const table = [...prev]
            table.push(hiveNumber)
            return table
        })
        dispatch(migrateHive(hiveID))
    }

    const handleClearMigrateList =() => {
        setMigrateList([])
    }

    const handleDoMigrate = () => {
        if (apiaryTo==='') {
            setChangeConfirmation({variant:'warning',message:'Wybierz pasiekę do której migrujesz'})
            return
        }
       dispatch(doMigrateHives(migrateList,apiaryTo,handleClearMigrateList,setChangeConfirmation))
    }

    const handleCancleMigrate = () => {
        handleClearMigrateList()
        dispatch(getHives(apiaryFrom))
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
            return <ListGroup.Item key={element}><ArchiveFill/> {element}</ListGroup.Item>  
    })

    const migrateButttons = 
        <>
            <Button onClick={handleDoMigrate} variant="success" className="m-1 mb-3 mr-2" >Zatwierdź</Button>
            <Button onClick={handleCancleMigrate} className="m-1 mb-3" >Anuluj</Button>
        </>

    const hivesList = 
        (
        <div>
             <table className="table table-striped m-0 mt-3 p-0 small_font">
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
        dispatch(getApiarys())
        return function cleanUp() {}
        },[]  
    )
    
    return (
        
        <Container>
            <Row>
                <Col sm={7}> 
                {apiarys.length>0 ? apiarysListFrom : noApiarysToShow}
                {hives.length>0 ? hivesList : noHivesToShow}  
                </Col>   
                <Col sm={5}>
                    {apiarys.length>0 ? apiarysListTo : noApiarysToShow}
                    {migrateList.length>0 ? migrateButttons : null}
                    {changeConfirmation.message ? <Alert variant={changeConfirmation.variant}>
                        <p>{changeConfirmation.message}</p></Alert> 
                        :
                        null
                    }
                    <ListGroup>{showMigrateList}</ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

/*

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
*/
export default List