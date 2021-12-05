import  {ADD,EDIT,DELETE,GET,CLEAR} from '../actions/hivesActions'

const hivesReducer = (state=[],action) => {
   // console.log(`Jestem w hivesReducer`)
    switch(action.type) {     
        case ADD: {
          //  action.setDefaultInput.setDefault()
            return [...state,action.data];
        } 
        case EDIT: {
            return state.filter(element=>{
                if (element._id !== action.data._id) {return element}
                else {
                    if (element.apiary===action.data.apiary) { return element  }
                }
                return false
            });
            /*
            return state.map(element=>{
                if (element._id !== action.data._id) {return element}
                if (
                     (element._id === action.data._id)
                      &&
                     (element.apiary!==action.data.apiary)
                    )
                    {
                        return (false)
                        
                    }
                return({
                    ...action.data
                }
                )
            })
            */
        }
        case GET: {
            return [...action.data]
        }
        case DELETE:
            return state.filter(element=>element._id !== action.data._id);
        case CLEAR:
            return []
        default: return state
    }
}

export default hivesReducer