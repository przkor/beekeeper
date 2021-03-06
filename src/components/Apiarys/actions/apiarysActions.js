
export const ADD = "addApiary"
export const DELETE = "delete"
export const EDIT = "editApiary"
export const GET = "getApiary"
export const GETHIVES = "getHivesAmount"

const dbCollection = 'apiary'

export const IDRandom =  () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

export const add = ({name,location},setNameInput,setLocationInput) => ({
    type:ADD,
    data: {
        name,
        location,
    },  
    dbCollection,
    setDefaultInput:{
        setNameInput,
        setLocationInput,
    }
})

export const del = (id)=> ({
    type:DELETE,
    data: {
        id
    },
    dbCollection
})

export const edit = ({_id,name,location}) => ({
    type: EDIT,
    data: {
        _id,
        name,
        location
    },
    dbCollection
})

export const get= (data) => ({
    type: GET,
    data: {
        ...data
    },
    dbCollection
})

export const getHivesAmount= (data2) => ({
    type: GETHIVES,
    data2: {
        ...data2
    },
    dbCollection
})


//poniższa funkcja ma zastosowanie gdy użyjemy middleware THUNK

/*
export const getApi = (dispatch) => {
    console.log (`Jestem w funkcji getApi`)
   return dispatch => fetch('/getApiary', {method:'POST'}) // tym zajmie się Redux Thunk
    .then(res => res.json())
    .then(
        
      data => {
          dispatch({type: GET,data})
          console.log (`Data z getApi:${data}`)
        },
      err => dispatch({ type: 'LOAD_DATA_FAILURE', err })
    );
}

*/

