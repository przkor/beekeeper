import  {ADD,EDIT,DELETE,GET} from '../actions/treatmentActions'

const treatmentReducer = (state=[],action) => {
    console.log(`Jestem w reducerze Treatment. Nazwa akcji: ${action.type}`)
    switch(action.type) {     
        case ADD: {
            action.setDefaultInput.setNameInput('')
            action.setDefaultInput.setProducerInput('')
            action.setDefaultInput.setDosageInput('')
            return [...state,action.data];
        } 
        case EDIT: {
            return state.map(element=>{
                const {_id,name,producer,dosage} = action.data
                if (element._id !== _id) {return element}
                return({
                    _id,
                    name,
                    producer,
                    dosage
                })
            })
        }
        case GET: {
            return [...action.data];
        }
        case DELETE:
            return state.filter(element=>element._id !== action.data.id);
        default: return state//console.warn(`Nie znaleziono akcji typu: ${action.type}`)
    }
}



export default treatmentReducer