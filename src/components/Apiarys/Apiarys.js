import React, {useContext} from 'react' ;
import {Provider} from 'react-redux'
import {store} from '../../store/apiaryStore.js'
import {useHistory} from 'react-router-dom'
import { ContextLogin } from '../ContextLogin';
import NotLoggedComponent from '../NotLoggedComponent'
import List from './List.js'
import FormAdd from './FormAdd.js'

const ApiarysList = () => {
  return (
    <div>
      <h5>Lista pasiek</h5>
      <table className="table table-striped table-sm mt-3">
        <thead className="thead thead-light">
          <tr>
            <th>Nazwa</th>
            <th>Lokalizacja</th>
            <th>Ilość Uli</th>
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
    return (<div><h5>Dodaj nową pasieke</h5><FormAdd/></div>)
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