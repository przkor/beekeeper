import {combineReducers} from 'redux'
//import treatmentReducer from '../Treatment/reducers/treatmentReducer'
import apiarysReducer from '../Apiarys/reducers/apiarysReducer'

const rootReducer = combineReducers({
   // drugs:treatmentReducer,
    apiarys:apiarysReducer,
})

export default rootReducer
