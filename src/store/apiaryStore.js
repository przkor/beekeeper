import {applyMiddleware,combineReducers,createStore} from 'redux'
//import rootReducer from '../components/rootReducer/rootReducer.js'
import apiarysReducer from '../components/Apiarys/reducers/apiarysReducer'
import {apiarysMiddleware} from '../components/Apiarys/middleware/apiarysMiddleware'
//import rootReducer from '../components/rootReducer/rootReducer'
//import thunk from 'redux-thunk'

//import {TreatmentMiddleware} from '../components/Treatment/middleware/databaseTreatmentMiddleware'
//import {ApiarysMiddleware} from '../components/Apiarys/middleware/databaseApiarysMiddleware'

 const reducer = combineReducers({
     apiarys:apiarysReducer,
 })

export const store = createStore(
    reducer,
    applyMiddleware(apiarysMiddleware),
    )
