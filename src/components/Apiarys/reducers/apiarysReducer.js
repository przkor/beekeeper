import  {ADD,EDIT,DELETE,GET} from '../actions/apiarysActions'

const apiarysReducer = (state=[],action) => {
    console.log(`Jestem w reducerze Apiarys. Nazwa akcji: ${action.type}`)
    switch(action.type) {
        case ADD: {
            action.setDefaultInput.setNameInput('')
            action.setDefaultInput.setLocationInput('')
            return [...state,action.data];
        } 
        case EDIT: {
            return state.map(element=>{
                const {_id,name,location} = action.data
                if (element._id !== _id) {return element}
                return({
                    _id,
                    name,
                    location
                })
            })
        }
        case GET: {
           // console.log(action.data)
            return [...action.data];
        }
        case DELETE:
            return state.filter(element=>element._id !== action.data.id);
        default:
            console.warn(`Nie znaleziono akcji typu: ${action.type}`)
            return state;
    }
}

export default apiarysReducer