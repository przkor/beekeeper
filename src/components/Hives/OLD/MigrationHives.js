import React,{useLayoutEffect} from 'react'


const MigrationHives = () => 
{
    useLayoutEffect(() => {
        document.getElementById('pokazUle').className='nav-link';
        document.getElementById('dodajUl').className='nav-link';
        document.getElementById('migracja').className='nav-link active';
      },[])

  return (   
    <div>
       <h5>Migracja Uli</h5>
    </div> 
  )
}

export default MigrationHives