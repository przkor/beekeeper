import React, {useState} from 'react'
import Element from './Element'
import {connect} from 'react-redux'
import {get} from './actions/treatmentActions'

const List = ({drugs,get}) => {
    const [isLoaded,setIsLoaded] = useState(false)
    if (isLoaded===false) {
        get()
        setIsLoaded(true)
    }

    const Elements = drugs.map(drug => (
    <Element key={drug._id} {...drug}/>
    ))

    return (
        <>
            {Elements}
        </>
    )
}

const connectReduxStateToProps = store => ({
    drugs:store.treatment,
})

const connectActionsToProps = ({
    get,
  })

const ListDrugs = connect(connectReduxStateToProps,connectActionsToProps)(List)

export default ListDrugs
