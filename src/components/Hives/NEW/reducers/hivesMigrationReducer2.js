import  {ADD2,DELETE2,GET2} from '../actions/hivesMigrationActions.js'

const hivesMigrationReducer2 = (state=[],action) => {
    console.log(`Jeste w hivesReducer2`)
    switch(action.type) {     
        case DELETE2: {
            return state.map(element=>{
                if (element._id !== action.data.id) {return element}
                if (element._id === action.data.id) {return {}}
                return({...action.data})  
            })
        }
        case ADD2: {
            const data = {number:'prze',type:'prze'}
            return [...state,data];
        } 
        case GET2: {
            return [...action.data]
        }
        default: return state
    }
}

export default hivesMigrationReducer2