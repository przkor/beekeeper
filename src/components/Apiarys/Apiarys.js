import React, {useContext} from 'react' ;
import {Provider} from 'react-redux'
import {store} from '../../store/apiaryStore.js'
import {useHistory} from 'react-router-dom'
import { ContextLogin } from '../ContextLogin';
import NotLoggedComponent from '../NotLoggedComponent'
import List from './List.js'
import FormAdd from './FormAdd.js'
import Container from 'react-bootstrap/Container'

const ApiarysList = () => {
  return (
      <Container fluid>
      <h5>Lista pasiek</h5>
      <table className="table table-striped table-sm">
        <thead className="thead thead-dark">
          <tr>
            <th>Nazwa</th>
            <th>Lokalizacja</th>
            <th>Uli [szt]</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          <List/>     
        </tbody>
      </table> 
    </Container>
  )
}

const Form = () => {
    return (<Container fluid><h5>Dodaj nową pasieke</h5><FormAdd/></Container>)
}

const Apiarys = () => {

  const {isUserLogged} = useContext(ContextLogin) 
  const history = useHistory()

  return (
   <> 
   {
      isUserLogged 
      ? 
      <>
      <Provider store={store}>
        <div>
         <ApiarysList/>
         <Form/>
        </div>
      </Provider>
     </>
     : 
      <NotLoggedComponent history={history}/>
   }
   </>    
  );
}

export default Apiarys;