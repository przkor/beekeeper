import  {GETapiarys} from '../actions/apiarysActions.js'

const apiarysReducer = (state=[],action) => {
   // console.log(`Jestem w apiarys Reducerze`)
    switch(action.type) {     
        case GETapiarys: {
            return [...action.data];
        }
        default: return state//console.warn(`Nie znaleziono akcji typu: ${action.type}`)
    }
}

export default apiarysReducer