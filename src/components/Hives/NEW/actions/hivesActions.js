import axios from 'axios'
export const ADD = 'addHive'
export const DELETE = 'delete'
export const EDIT = 'editHive'
export const GET = 'getHives'
export const CLEAR = 'clear'

const dbCollection = 'hives'

export const IDRandom =  () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

export const add = ({_id,number,type,mother,motherYear,power,status,apiary},setDefault) => ({
    type:ADD,
    data: {
        _id,
        number,
        type,
        mother,
        motherYear,
        power,
        status,
        apiary,  
    },   
    dbCollection,
    setDefaultInput:{
        setDefault
    }
    }
)

export const del= (id,collection) => ({
    type: DELETE,
    data: {
        id,
        collection,
    },
    dbCollection
})

export const edit = ({_id,number,type,mother,motherYear,power,status,apiary}) => ({
    type: EDIT,
    data: {
        _id,
        number,
        type,
        mother,
        motherYear,
        power,
        status,
        apiary, 
    },
    dbCollection
})

export const get = (data) => ({
    type: GET,
    data: {
        ...data
    }
})

export function getHives(apiaryID) {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/hives',
            params: {apiaryID}  
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
               // console.log(`apiaryID: ${apiaryID}`)
               // console.log(`Response.data.result: ${response.data.result}`)
               if (response.data!==false) {
                dispatch({type:GET,data:response.data})
               }
               else {return}

            }
        })
        .catch(function (error) {
           console.log(error);
        });
      
  }
}

export function addHive(data,setDefault) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/hives',
            data: {data}  
        })
        .then(function (response) {
            //const newID=response.data
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else if(response.data===false) {
                alert('Błąd, nie dodano rekordu!'); 
                return; 
            }
            else {
                alert('Dodano do bazy')
                setDefault({
                    number:'',
                    type:'',
                    mother:'',
                    motherYear:'',
                    power:'',
                    status:'',
                    apiary:'',
                    isActive:true,
                })
            }
        })
        .catch(function (error) {
           console.log(error);
        });
      
  }
}

export function delHive(id) {
    return (dispatch) => {
        axios({
            method: 'delete',
            url: '/hives',
            params: {id}  
        })
        .then(function (response) {
            //const newID=response.data
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else if(response.data===false) {
                alert('Błąd, nie usunięto rekordu!'); 
                return; 
            }
            else {
                dispatch({type:DELETE, data:{_id:id}})  

            }
        })
        .catch(function (error) {
           console.log(error);
        });
      
  }
}

export function editHive(data) {
    return dispatch => {
        axios({
            method: 'put',
            url: '/hives',
            data: {data}  
        })
    .then(function (response) {
        if (response.data==="access denied")
        {
            window.location.assign('/');
            return
        }
        else {
           if (response.data===true && response.status===200) {
               dispatch({type:EDIT, data:data})
               console.log(`Pomyślnie edytowano i zapisano`) 
            }
           else {console.warn(`Błąd! Nie zmieniono w bazie.`)}
            

        }
    })
    .catch(function (error) {
       console.log(error);
    });
}
}

export function migrateHive(id) {
    const _id = id
    return (dispatch) => {    
            dispatch({type:DELETE, data:{_id}})          
    }
}

export function doMigrateHives(data,apiaryID,handleClearMigrateList,setChangeConfirmation) {
    return dispatch => {
        const hivesNumbers = data
        axios.patch("/hives", {
            data:{hivesNumbers,apiaryID}
        })
        .then(function (response) {
            if (response.data==="access denied")
            {
                window.location.assign('/');
                return
            }
            else {
            const modifiedHivesAmount = response.data.modifiedHivesAmount
               if ( modifiedHivesAmount >= 1) {
                    handleClearMigrateList()
                    setChangeConfirmation(`Zmigrowano pomyślnie ${modifiedHivesAmount} ule.`)
                    dispatch({type:'none'}) 
                }
               else {console.warn(`Błąd bazy! Nie zmigrowano.`)}   
            }
        })
        .catch(function (error) {
           console.log(error);
        });
    }
}

export const clear= () => ({
    type: CLEAR,
    data: []
})

