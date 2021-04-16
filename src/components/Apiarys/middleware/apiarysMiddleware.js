
import {ADD,GET,EDIT,DELETE} from '../actions/apiarysActions'
import axios from 'axios'

export const apiarysMiddleware = store => next => action =>  {

    const data=action.data
    const type=action.type
    if (type === ADD) {
        axios.post("/apiarys", {
            data
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else if(response.data.insertedCount!==1) {
                alert('Błąd, nie dodano rekordu!'); 
                return; 
            }
            else {
                action.data = {
                    _id:response.data.insertedId ,
                    name:data.name,
                    location:data.location
                }
              next(action)
            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }
    
    if (type === GET) { 
        axios.get("/apiarys", { 
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
    
    if (type === EDIT) {
        axios.put("/apiarys", {
            data
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
               if (response.data===true) {next(action); }
               else {console.warn(`Błąd! Nie zmieniono w bazie.`)}
            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }

    if (type === DELETE) {
        axios.delete("/apiarys", {
            params: {id:data._id}
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
               if (response.data.deletedNumber>0) {next(action); }
               else {console.warn(`Błąd! Nie usunięto z bazy.`)}   
            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }
       
} 

