import React, {useContext,useLayoutEffect} from 'react' ;
import {Provider} from 'react-redux'
import {store} from '../../../store/hivesStore.js'
import {useHistory} from 'react-router-dom'
import { ContextLogin } from '../../ContextLogin';
import NotLoggedComponent from '../../NotLoggedComponent'
import MigrationTable from './MigrationTable.js'

const MigrationComponent = () => {
  return (
          <MigrationTable/>      
  )
}


const Migration = () => {

  const {isUserLogged} = useContext(ContextLogin) 
  const history = useHistory()

  useLayoutEffect(() => {
    document.getElementById('showHives').className='nav-link';
    document.getElementById('addHive').className='nav-link';
    document.getElementById('migration').className='nav-link active';
  },[])
 
  return (
   <> 
   {
      isUserLogged 
      ? 
      <>
      <Provider store={store}>
        <div>
          <MigrationComponent/>
        </div>
      </Provider>
     </>
     : 
      <NotLoggedComponent history={history}/>
   }
   </>    
  );
}

export default Migration;