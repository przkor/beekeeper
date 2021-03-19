import  {ADD1,DELETE1,GET1} from '../actions/hivesMigrationActions.js'

const hivesMigrationReducer1 = (state=[],action) => {
    console.log(`Jeste w hivesReducer1`)
    //const data = action.data
   // const id = action.data.id
    switch(action.type) {     
        case DELETE1: {
            return state.map(element=>{
                if (element._id !== action.data.id) {return element}
                if (element._id === action.data.id) {return {}}
                return({...action.data})  
            })
        }
        case ADD1: {
            const data = {number:'prze',type:'prze'}
            return [...state,data];
        } 
        case GET1: {
            return [...action.data]
        }
        default: return state
    }
}

export default hivesMigrationReducer1