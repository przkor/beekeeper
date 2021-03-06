import React, {useState, useContext} from 'react' ;
import {useHistory} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import FormAdd from './FormAdd'
import ShowHives from './ShowHives'
import MigrationHives from './MigrationHives'
import { ContextLogin } from '../../ContextLogin';
import NotLoggedComponent from '../../NotLoggedComponent'

const ComponentToShow = ({action}) => {
    let componentToShow
    switch (action) {
        case 'showHives' : componentToShow=<ShowHives/>
        break
        case 'addHive' : componentToShow=<FormAdd/>
        break
        case 'migrationHives' : componentToShow=<MigrationHives/>
        break
        default: componentToShow=<ShowHives/>
    }
    return (  
        <>
        <Container fluid>{componentToShow}</Container>
        </>
    );
}

const Hives = () => {
    const {isUserLogged} = useContext(ContextLogin)  
    const history = useHistory()

    const [component,setComponent] = useState('')
    const handleClickButton = (e) => {
        e.preventDefault()
        setComponent(e.target.value)
    }

    const tab = () => {
        return (
        <ul className="nav nav-tabs" >
            <li className="nav-item"><button className="nav-link active" 
            onClick={handleClickButton} value="showHives" id="showHives">Ule</button></li>
            <li className="nav-item"><button className="nav-link" 
            onClick={handleClickButton} value="addHive" id="addHive">Dodaj</button></li>
            <li className="nav-item"><button className="nav-link" 
            onClick={handleClickButton} value="migrationHives" id="migrationHives">Migracje</button></li>
        </ul>
        )
    }

    return (
        <> 
        {
           isUserLogged 
           ? 
           <>
           
            {tab()}
            <ComponentToShow action={component}/>
          </>
          : 
           <NotLoggedComponent history={history}/>
        }
        </>      
    
      );
}

export default Hives