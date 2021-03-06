import {applyMiddleware,combineReducers,createStore} from 'redux'
//import rootReducer from '../components/rootReducer/rootReducer.js'
import treatmentReducer from '../components/Treatment/reducers/treatmentReducer'
import {treatmentMiddleware} from '../components/Treatment/middleware/treatmentMiddleware'
//import rootReducer from '../components/rootReducer/rootReducer'
//import thunk from 'redux-thunk'

//import {TreatmentMiddleware} from '../components/Treatment/middleware/databaseTreatmentMiddleware'
//import {ApiarysMiddleware} from '../components/Apiarys/middleware/databaseApiarysMiddleware'
const reducer = combineReducers({
    treatment:treatmentReducer,
})
export const store = createStore(
    reducer,
    applyMiddleware(treatmentMiddleware),
    )
