import {applyMiddleware,createStore} from 'redux'
import rootReducer from '../components/rootReducer/rootReducer.js'
import {rootMiddleware} from '../components/rootMiddleware/rootMiddleware.js'
//import thunk from 'redux-thunk'

//import {TreatmentMiddleware} from '../components/Treatment/middleware/databaseTreatmentMiddleware'
//import {ApiarysMiddleware} from '../components/Apiarys/middleware/databaseApiarysMiddleware'


export const store = createStore(
    rootReducer,
    applyMiddleware(rootMiddleware),
    )
