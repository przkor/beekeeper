import {applyMiddleware,combineReducers,createStore} from 'redux'
import hivesMigrationReducer1 from '../components/Hives/NEW/reducers/hivesMigrationReducer1'
import hivesMigrationReducer2 from '../components/Hives/NEW/reducers/hivesMigrationReducer2'
//import {hivesMiddleware} from '../components/Hives/NEW/middleware/hivesMiddleware'
import apiarysReducer from '../components/Hives/NEW/reducers/apiarysReducer'
//import {apiarysMiddleware} from '../components/Hives/NEW/middleware/apiarysMiddleware'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    hives1:hivesMigrationReducer1,
    hives2:hivesMigrationReducer2,
    apiarys:apiarysReducer,
})
export const store = createStore(
    reducer,
    applyMiddleware(thunk),
    )
