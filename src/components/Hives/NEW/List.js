import React, {useEffect,useState} from 'react'
import Element from './Element'
import {connect} from 'react-redux'
import {getHives,clear} from './actions/hivesActions'
import {getApiarys} from './actions/apiarysActions'
import { Container,Col,Row } from 'react-bootstrap'

const List = ({hives,apiarys,getHives,getApiarys,clear}) => {
    
    const [loading,setLoading] = useState ({
        apiarys:false,
        hives:false
    })

    const callbackApiarys = () => {
        setLoading(prevState=>{
            return {
                apiarys:false,
                ...prevState.hives   
            }
        })
    }

    const callbackHives = () => {
        setLoading(prevState=>{
            return {
                hives:false,
                ...prevState.apiarys   
            }
        })
    }

/* Funkcja getHivesAmonutIn Apiary została usunięta ponieważ jest nie potrzebna
ilość uli jest sprawdzana za ponocą metody lenghth dla stata hives. Metoda ta zwraca ilość obiektów 
znajdujących się w zmiennej hives 

  const [hivesAmount,setHivesAmount] = useState(0)

    const getHivesAmountInApiary = (apiaryID) => {
        const _id = apiaryID
        axios({
            method:'get',
            url:'/hives/getHivesAmountInApiary',
            params:{_id}
        }).then(function(response){
            setHivesAmount(response.data.result)
        }).catch(function (error) {
            console.log(error);
         });
    }
    */
    const handleSelect = (e) => {
        const apiaryID = e.target.value
        setLoading({hives:true, apiarys:false})
        getHives(apiaryID,callbackHives) 
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
            <p>brak uli</p>
        </div>
    )

    const noApiarysToShow = (
        <div>
            <p>Brak pasiek w bazie</p>
        </div>
    )
    const apiarysList = (
        <Container className="m-0 p-0" >
            <Row className="m-0 mt-5 p-0">
                <Col md={12}>
                    <p><b>Wybierz pasieke:</b></p>
                    <form className="m-auto" style={{maxWidth:'90%'}}>
                        <select
                        onChange={handleSelect}
                        className="form-control text-center mb-3"
                        id="pasieka"
                        name="pasieka"
                        placeholder="wybierz"
                        >
                        <option value=''>wybierz</option>
                            {Apiarys}
                        <option value='all'>wszystkie</option>
                        </select>
                    </form>
                </Col>
            </Row>
        </Container>

    )
    const hivesList = 
        (
            <Container className="small_font p-0 m-0">
                <h6 className="mb-4"><u>Łączna ilość uli: {hives.length}</u></h6>
                <p style={{textAlign:'left'}}>*Kliknij aby rozwinąć...</p>
                {Elements}
            </Container>                    
    )

    useEffect(() => { 
        clear()
        setLoading({apiarys:true,hives:false})
       // setLoading(prev=>({apiarys:true, ...prev}))
        getApiarys(callbackApiarys)
        return function cleanUp() {clear()}
        },[getApiarys,clear]  
    )

    return (
    <Container className="m-0 p-0">
        {
            !loading.apiarys 
            ?
            apiarys.length>0 ? apiarysList : noApiarysToShow 
            : <p>Ładowanie</p>
        }
        {
            !loading.hives
            ?
            hives.length>0 ? hivesList : noHivesToShow
            : <p>Ładowanie</p>
        }
         
    </Container>
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
