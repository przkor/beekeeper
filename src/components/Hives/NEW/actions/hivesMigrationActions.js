import axios from 'axios'
export const GET1 = 'getMigrateHives1'
export const ADD1 = 'addHives1'
export const DELETE1 = 'deleteHive1'
export const GET2 = 'getMigrateHives2'
export const DELETE2 = 'delete2Hive2'
export const ADD2 = 'addHives2'

const dbCollection = 'hives'

export const get = (data) => ({
    type: GET1,
    data: {
        ...data
    }
})

export function getHives(apiaryID,tab) {
    return (dispatch) => {
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
               if (response.data!==false) {
                   if (tab===1) {dispatch({type:GET1,data:response.data})}
                   if (tab===2) {dispatch({type:GET2,data:response.data})}   
               }
               else {return}
            }
        })
        .catch(function (error) {
           console.log(error);
        });
  }
}


export function migrateHive(id,apiaryID,tab) {
    console.log(`Jetem w migrateHive`)
    return (dispatch) => {
        if (tab===1) {
            dispatch({type:DELETE1, data:{id}})
            dispatch({type:ADD2, data:{id}})
        }
        if (tab===2) {
            dispatch({type:DELETE2, data:{id}})
            dispatch({type:ADD1, data:{id}})
        }
        else return
        
    }
    
    /*
    return dispatch => {
    axios.post("/migrate", {
        id,
        apiaryID,
        dbCollection,
    })
    .then(function (response) {
        if (response.data==="access denied")
        {
            window.location.assign('/');
            return
        }
        else {
           if (response.data===true) {
               dispatch({type:MIGRATE1, id:id})
               dispatch({type:MIGRATE2, id:id})
            }
           else {console.warn(`Błąd! Nie zmieniono w bazie.`)}
            

        }
    })
    .catch(function (error) {
       console.log(error);
    });
}
*/
}
