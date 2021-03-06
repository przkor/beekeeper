import React, {useState} from 'react'
import Element from './Element'
import {connect} from 'react-redux'
import {get} from './actions/apiarysActions'

const List = ({apiarys,get}) => {
  const [dataIsLoaded,setDataIsLoaded] = useState(false)
   if (dataIsLoaded===false) {
       // w przypadku użycia Middleware THUNK:
        //getApi(apiarys.dispatch)  
        get()
        setDataIsLoaded(true)
    }
      

    const Elements = apiarys.map(apiary => (
    <Element key={apiary._id} {...apiary}/>
    ))

    return (
        <>
            {Elements}
        </>
    )
}

const connectReduxStateToProps = (store) => ({
    apiarys:store.apiarys,
})

const connectActionsToProps = ({
    get,
  })

const ApiarysList = connect(connectReduxStateToProps,connectActionsToProps)(List)

export default ApiarysList
