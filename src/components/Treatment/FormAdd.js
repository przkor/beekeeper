import React, {useState} from 'react'
import {connect} from 'react-redux'
import {add,edit} from './actions/treatmentActions'

//import treatmentFromDatabase from './TreatmentDatabase'

const FormAdd = ({
  add,
  edit,
  _id='',
  name = '',
  producer = '',
  dosage = '',
  callback,
}) => 
{
  console.log(`_id: ${_id}`)

  const [nameInput,setNameInput] = useState(name)
  const [producerInput,setProducerInput] = useState(producer)
  const [dosageInput,setDosageInput] = useState(dosage)
  
  const [nameValidation, setNameValidation] = useState('')
  const [producerValidation, setProducerValidation] = useState('')
  const [dosageValidation, setDosageValidation] = useState('')

  const handleChangeName = (e) => {
    setNameInput(e.target.value)
  }

  const handleChangeProducer = (e) => {
    setProducerInput(e.target.value)
    }

  const handleChangeDosage = (e) => {
    setDosageInput(e.target.value)
    }

  const handleOnSubmit =  (e) => {
    e.preventDefault()
    if(!nameInput.length) {setNameValidation('Nie wpisałeś nazwy leku')}
    if(!producerInput.length) {setProducerValidation('Nie wpisałeś producenta')}
    if(!dosageInput.length) {setDosageValidation('Nie wpisałeś dawkowania')}
    const drugObject = {
      _id,
      name:nameInput,
      producer:producerInput,
      dosage:dosageInput,
    }
    _id ? edit(drugObject) : add(drugObject,setNameInput,setProducerInput,setDosageInput)
    if (_id) {callback()}
  }

    return(   
      <div className="form-area mb-2 pb-2">
              <br styles="clear:both" />
                <form onSubmit={handleOnSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={handleChangeName}
                      className="form-control"
                      id="name"
                      name="name"
                      value={nameInput||''}
                      placeholder="nazwa(wymagana)"
                      maxLength="30"
                      required
                    /><p>{nameValidation ? nameValidation : nameValidation}</p>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={handleChangeProducer}
                      className="form-control"
                      id="producer"
                      name="producer"
                      value={producerInput||''}
                      placeholder="producent(wymagane)"
                      maxLength="30"
                      required
                    /><p>{producerValidation ? `${producerValidation}` : ''}</p>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={handleChangeDosage}
                      className="form-control"
                      id="dosage"
                      name="dosage"
                      value={dosageInput||''}
                      placeholder="dawkowanie(wymagane)"
                      maxLength="25"
                      required
                    />{dosageValidation ? `${dosageValidation}`: ''}
                  </div>   
                  <div className="form-group"> 
                    <button
                      type="submit"
                      id="submit"
                      name="submit"
                      className="btn btn-primary pull-right"
                    >
                      {_id ? 'Zapisz zmiane' : 'Dodaj'}
                    </button>
                  </div>
            </form>
          </div>
    ) 
  }

  const connectActionsToProps = ({
    add,
    edit,
  })

  const FormAddConsumer = connect(null,connectActionsToProps)(FormAdd)

  export default FormAddConsumer