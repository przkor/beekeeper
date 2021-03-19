import React, {useContext,useLayoutEffect} from 'react' ;
import {Provider} from 'react-redux'
import {store} from '../../../store/hivesStore.js'
import {useHistory} from 'react-router-dom'
import { ContextLogin } from '../../ContextLogin';
import NotLoggedComponent from '../../NotLoggedComponent'
import List from './List.js'
import PopUp from './Modal/Modal.js'

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
  },[])
 
  return (
   <> 
   {
      isUserLogged 
      ? 
      <>
      <Provider store={store}>
        <div>
          <HivesList/>
        </div>
        <div><PopUp/></div>
      </Provider>
     </>
     : 
      <NotLoggedComponent history={history}/>
   }
   </>    
  );
}

export default Hives;