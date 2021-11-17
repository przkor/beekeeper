
import {GET} from '../actions/apiarysActions'
import axios from 'axios'

export const apiarysMiddleware = store => next => action =>  {
    const type=action.type
    const dbCollection = action.dbCollection
    if (type === GET) {
        axios.post("/get", {
            dbCollection
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
                action.data = response.data
                next(action); 

            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }   
   next(action)
} 

