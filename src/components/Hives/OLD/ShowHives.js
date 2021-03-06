import React,{ useLayoutEffect} from 'react'
import ShowHivesSection from './ShowHivesSection'


const ShowHives = () => 
{
  useLayoutEffect(() => {
    document.getElementById('pokazUle').className='nav-link active';
    document.getElementById('dodajUl').className='nav-link';
    document.getElementById('migracja').className='nav-link';
  },[])

  return (  
    <ShowHivesSection/>
  )
}

export default ShowHives