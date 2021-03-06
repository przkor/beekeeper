import React from 'react';
import {Link} from 'react-router-dom'
import Apiarys from '../components/Apiarys/Apiarys'
import Hives from '../components/Hives/NEW/Hives'
import Quens from '../components/Quens/Quens'
import Treatment from '../components/Treatment/Treatment'

const ManagerPage = (props) => { 
    const option = props.match.params.option
    let componentToShow
    switch (option) {
        case 'pasieki' : componentToShow=<Apiarys/>
        break
        case 'ule' : componentToShow=<Hives/>
        break
        case 'matki' : componentToShow=<Quens/>
        break
        case 'leczenie' : componentToShow=<Treatment/>
        break
        default: console.log ("błędny link")
    }
    return (  
        <>
        <div><h5>Zarządzanie - {option}</h5></div>
        <div>{componentToShow}</div>
        <div>
        <Link to="/managers"><h6>Powrót</h6></Link>
        </div>
</>
    );
}
 
export default ManagerPage;