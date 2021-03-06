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
               // console.log(`apiaryID: ${apiaryID}`)
               // console.log(`Response.data.result: ${response.data.result}`)
                dispatch({type:GET,data:response.data})
            }
        })
        .catch(function (error) {
           console.log(error);
        });
      
  }
}

export function addHive(data,setDefault) {

    return (dispatch) => {
        axios.post("/add", {
            data,
            dbCollection
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
              //  dispatch({type:ADD, data:{_id:newID, ...data}}) 
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

export function editHive(data) {
    return dispatch => {
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
           if (response.data===true) {
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

export const clear= () => ({
    type: CLEAR,
    data: null
})

