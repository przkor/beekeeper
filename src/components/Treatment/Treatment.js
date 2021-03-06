import React, {useContext} from 'react' ;
import {Provider} from 'react-redux'
import {store} from '../../store/treatmentStore.js'
import {useHistory} from 'react-router-dom'
import { ContextLogin } from '../ContextLogin';
import NotLoggedComponent from '../NotLoggedComponent'
import List from './List.js'
import FormAdd from './FormAdd.js';

const DrugsList = () => {
  return (
    <div>
      <h5>Lista leków</h5>
      <table className="table table-striped table- mt-3">
        <thead className="thead thead-light">
          <tr>
            <th>Lek</th>
            <th>Dostawca</th>
            <th>Dawkowanie</th>
            <th>edytuj</th>
            <th>usuń</th>
          </tr>
        </thead>
        <tbody>
          <List/>     
        </tbody>
      </table> 
    </div>
  )
}

const Form = () => {
    return (<div><h5>Dodaj nowy lek</h5><FormAdd/></div>)
}

const Treatment = () => {

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
         <DrugsList/>
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

export default Treatment;