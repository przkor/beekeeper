import React, {useContext,useLayoutEffect} from 'react' ;
import {Provider} from 'react-redux'
import {store} from '../../../store/hivesStore.js'
import {useHistory} from 'react-router-dom'
import { ContextLogin } from '../../ContextLogin';
import NotLoggedComponent from '../../NotLoggedComponent'
import List from './List.js'
import Container from 'react-bootstrap/Container'

const HivesList = () => {
  return (
          <List/>      
  )
}

const Hives = () => {

  const {isUserLogged} = useContext(ContextLogin) 
  const history = useHistory()

  useLayoutEffect(() => {
    document.getElementById('showHives').className='nav-link active';
    document.getElementById('addHive').className='nav-link';
    document.getElementById('migrationHives').className='nav-link';
  },[])
 
  return (
   <> 
   {
      isUserLogged 
      ? 
      <Container fluid className="p-0 m-0">
      <Provider store={store}>
          <HivesList/>
      </Provider>
     </Container>
     : 
      <NotLoggedComponent history={history}/>
   }
   </>    
  );
}

export default Hives;