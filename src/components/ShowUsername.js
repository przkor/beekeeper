import React from 'react'

const ShowUsername = ({username}) => {
    return (
    <>
     {username ? <h6>Użytkownik: {username}</h6> : <p></p>}
    </>
  
)
    }

export default ShowUsername