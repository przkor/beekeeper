import React, {useContext,useEffect,useReducer} from 'react' ;
import {useHistory} from 'react-router-dom'
import FormAddQuen from './FormAddQuen.js'
import ShowQuens from './ShowQuens.js'
import { ContextLogin } from '../ContextLogin';
import NotLoggedComponent from '../NotLoggedComponent'
import quensFromDatabes from './QuensDatabase.js';

const quensReducer = (state,action) => {
    switch(action.type) {
        case 'add':
          return [...state,action.data];
        case 'remove':
            return state.filter(quen=>quen._id !==action._id);
        case 'fetch': 
          return action.data  
        default:
            throw new Error ('Nie znaleziono takiej akcji')
    }
}
const quensTable = (state,dispatch) => {
    const quens = state.map(element =>(
        <ShowQuens key={element._id} onClickHandler={dispatch} {...element}/>
    ))
    return (
    <div>
          <table className="table table-striped table-sm table-hover">
            <thead className="thead thead-light">
              <tr>
                <th>Linia</th>
                <th>Dostawca</th>
                <th>usuń</th>
              </tr>
            </thead>
            <tbody>
               {quens}      
            </tbody>
          </table>
        </div>
        )
}

const Quens = () => {

  const {isUserLogged} = useContext(ContextLogin) 
  const history = useHistory()
  const [state,dispatch] = useReducer(quensReducer,[])
  
  const getData = () => {
    quensFromDatabes.getQuens(dispatch)
  }

  useEffect(()=>{
    getData()
  },[])

  return (
   <> 
   {
      isUserLogged 
      ? 
      <>
      {quensTable(state,dispatch)}
      <FormAddQuen addHandler={dispatch}/>
     </>
     : 
      <NotLoggedComponent history={history}/>
   }
   </>    
  );
}

export default Quens;