import React, {useState, useContext} from 'react' ;
import {useHistory} from 'react-router-dom'
import {Container,Button} from 'react-bootstrap'
import ShowTasks from '../components/Tasks/ShowTasks'
import ShowHistorycalTasks from '../components/Tasks/ShowHistorycalTasks'
import { ContextLogin } from '../components/ContextLogin';
import NotLoggedComponent from '../components/NotLoggedComponent'

const ComponentToShow = ({action}) => {
    let componentToShow
 
    switch (action) {
        case 'showTasks' : componentToShow=<ShowTasks/>
        break
        case 'showHistorycalTasks' : componentToShow=<ShowHistorycalTasks/>
        break
        default: componentToShow=<ShowTasks/>
    }
    return (  
        <Container fluid>
            {componentToShow}
        </Container>
    );
}

const Tasks = () => {
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
            <li className="nav-item"><Button className="nav-link active"
            onClick={handleClickButton} value="showTasks" id="showTasks">Aktywne</Button></li>
            <li className="nav-item"><Button className="nav-link"  
            onClick={handleClickButton} value="showHistorycalTasks" id="showHistorycalTasks">Zakończone</Button></li>
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

export default Tasks