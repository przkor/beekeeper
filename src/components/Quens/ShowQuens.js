import React from 'react'
import quensFromDatabase from './QuensDatabase'

  const ShowQuens = ({_id,line,delivery,onClickHandler}) => {
    const handleClick = async () => {
      const id = _id
      await quensFromDatabase.deleteQuen(id)
      onClickHandler({
        type:'remove',
        _id
      })
    }
    return (
        <tr key={_id}>
            <td>{line}</td>
            <td>{delivery}</td>
            <td><button onClick={handleClick}>Usuń</button></td>
        </tr>      

      );
  }

  export default ShowQuens
