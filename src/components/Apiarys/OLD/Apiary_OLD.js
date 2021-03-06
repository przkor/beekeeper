import React, {useState, useContext} from 'react' ;
import {useHistory} from 'react-router-dom'
import FormAddApiary from './FormAddApiary_OLD.js'
import ShowApiarys from './ShowApiarys_OLD.js'
import apiarysDatabase from '../ApiarysDatabase'
import { ContextLogin } from '../../ContextLogin';
import NotLoggedComponent from '../../NotLoggedComponent'

const Apiary = () => {
  const {isUserLogged} = useContext(ContextLogin) 
  const history = useHistory()
  const [name,setName] = useState('')
  const [location,setLocation] = useState('')
  const [confirmation,setConfirmation] = useState('')
  const [addedApiary, setAddedApiary] = useState(false) 

  const handleNameChange = (e) => {
      setName(e.currentTarget.value);
    }

  const handleLocationChange = (e) => {
      setLocation(e.currentTarget.value);
    }
    
  const handleConfirmationChange = (e) => {
      setConfirmation(e.currentTarget.value);
    }
    
  const addApiary = () => {
    apiarysDatabase.addApiary(name,location,setName,setLocation,setConfirmation,setAddedApiary)
  }
  
  return (
   <> 
   {
      isUserLogged 
      ? 
      <>
      <ShowApiarys addedApiary={addedApiary}/>
      <FormAddApiary name={name} location = {location} confirmation = {confirmation}
      handleName={handleNameChange} handleLocation={handleLocationChange}
      handleConfirmationChange={handleConfirmationChange} handleAddButton={addApiary}
      >
      <div><p>{confirmation}</p></div>
      </FormAddApiary>
     </>
     : 
      <NotLoggedComponent history={history}/>
   }
   </>    
  );
}

export default Apiary;