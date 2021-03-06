import {applyMiddleware,combineReducers,createStore} from 'redux'
import hivesReducer from '../components/Hives/NEW/reducers/hivesReducer'
//import {hivesMiddleware} from '../components/Hives/NEW/middleware/hivesMiddleware'
import apiarysReducer from '../components/Hives/NEW/reducers/apiarysReducer'
//import {apiarysMiddleware} from '../components/Hives/NEW/middleware/apiarysMiddleware'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    hives:hivesReducer,
    apiarys:apiarysReducer
})
export const store = createStore(
    reducer,
    applyMiddleware(thunk),
    )
