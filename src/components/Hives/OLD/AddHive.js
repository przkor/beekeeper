import React, { useLayoutEffect} from 'react'
import FormAddHives from './FormAddHives.js'

const AddHive = () => { 
  useLayoutEffect(() => {
      document.getElementById('pokazUle').className='nav-link';
      document.getElementById('dodajUl').className='nav-link active';
      document.getElementById('migracja').className='nav-link';
      console.log('Renderuje useLayoutEffect')
    },[])

  return (
    <div> 
       <FormAddHives/>
    </div>      
  );
}

export default AddHive;