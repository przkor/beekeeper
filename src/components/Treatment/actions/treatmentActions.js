export const ADD = 'addDrug'
export const DELETE = 'delete'
export const EDIT = 'editDrug'
export const GET = 'getDrugs'

const dbCollection = 'treatment'

export const IDRandom =  () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

export const add = ({name,producer,dosage},setNameInput,setProducerInput,setDosageInput) => ({
    type:ADD,
    data: {
        name,
        producer,
        dosage,
    },   
    dbCollection,
    setDefaultInput:{
        setNameInput,
        setProducerInput,
        setDosageInput
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

export const edit = ({_id,name,producer,dosage}) => ({
    type: EDIT,
    data: {
        _id,
        name,
        producer,
        dosage,
    },
    dbCollection
})

export const get = (data) => ({
    type: GET,
    data: {
        ...data
    },
    dbCollection
})

