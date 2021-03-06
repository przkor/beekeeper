import React, {useState, useContext} from 'react' ;
import {useHistory} from 'react-router-dom'
import AddHive from './AddHive'
import ShowHives from './ShowHives'
import MigrationHives from './MigrationHives'
import { ContextLogin } from '../../ContextLogin';
import NotLoggedComponent from '../../NotLoggedComponent'

const ComponentToShow = ({action}) => {
    let componentToShow
    switch (action) {
        case 'pokazUle' : componentToShow=<ShowHives/>
        break
        case 'dodajUl' : componentToShow=<AddHive/>
        break
        case 'migracja' : componentToShow=<MigrationHives/>
        break
        default: componentToShow=<ShowHives/>
    }
    return (  
        <>
        <div>{componentToShow}</div>
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
            onClick={handleClickButton} value="pokazUle" id="pokazUle">Ule</button></li>
            <li className="nav-item"><button className="nav-link" 
            onClick={handleClickButton} value="dodajUl" id="dodajUl">Dodaj Ul</button></li>
            <li className="nav-item"><button className="nav-link" 
            onClick={handleClickButton} value="migracja" id="migracja">Migracja</button></li>
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