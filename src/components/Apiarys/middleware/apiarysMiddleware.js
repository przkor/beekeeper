
import {ADD,GET,GETHIVES,EDIT,DELETE} from '../actions/apiarysActions'
import axios from 'axios'

export const apiarysMiddleware = store => next => action =>  {
    
    const data=action.data
    const type=action.type
    const dbCollection = action.dbCollection
    console.log(`Jestem w apiarysMiddlewar. Akcja: ${action.type}`)
    if (type === ADD) {
        axios.post("/add", {
            data,
            dbCollection
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
        axios.post("/get", { 
            data,
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
    
    if (type===GETHIVES) {
        axios
            .post("/getHivesAmountInApiary", {
            })
            .then(function (response) {
                if (response.data==="access denied")
                {
                    window.location.assign('/');
                    return
                }
                else {
                    action.data=response.data  
                    next(action)    
                }
            })
            .catch(function (error) {
               console.log(error);
            });        
    }
    
    if (type === EDIT) {
        axios.post("/update", {
            data,
            dbCollection
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
               if (response.data===true) {console.log(`Pomyślnie edytowano i zapisano`);next(action); }
               else {console.warn(`Błąd! Nie zmieniono w bazie.`)}
                

            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }

    if (type === DELETE) {
        axios.post("/delete", {
            data,
            dbCollection
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
               if (response.data.deletedNumber>0) {console.log(`Pomyślnie usunięto`);next(action); }
               else {console.warn(`Błąd! Nie usunięto z bazy.`)}
                
            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }
    
    
} 

