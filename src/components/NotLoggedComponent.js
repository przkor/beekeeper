import React from 'react'

const NotLoggedComponent = ({history}) => {
    const handleRedirect= () => {
        const location = { 
          pathname: '/'
        }
         history.push(location)
       }
    
       const notLoggedInformation = () => {
        return (
        <div>
          <p>Użytkownik nie jest zalogowany / brak dostępu</p>
          <button onClick={handleRedirect}>Zaloguj sie</button>
        </div>       
        )
       }
    return (
    <>{notLoggedInformation()}
    </>
    )
}

export default NotLoggedComponent