
import {ADD,GET,EDIT,DELETE} from '../actions/hivesActions'
import axios from 'axios'

export const hivesMiddleware = store => next => action =>  {
    console.log(`Jestem w hivesMiddleware, akcja: ${action.type}`)
    const data=action.data
    const type=action.type
    const apiaryID = action.apiaryID
    const dbCollection = action.dbCollection
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
                /*
                action.data = {
                    _id:response.data.insertedId ,
                    name:data.name,
                    producer:data.producer,
                    dosage:data.dosage
                }
                */
               console.warn('Dodano do bazy')
              next(action)
            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }
    if (type === GET) {
        axios.post("/get", {
            apiaryID,
            dbCollection
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
                console.log(`Response.data: ${response.data}`)
                action.data = response.data 
                next(action); 

            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }

    if (type === EDIT) {
        axios.post("/update", {
            data,
            dbCollection,
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
    
  next(action)
} 

