import React, {useState} from 'react'
import {connect} from 'react-redux'
import {add,edit} from './actions/apiarysActions'

const FormAdd = ({
  add,
  edit,
  _id='',
  name = '',
  location = '',
  callback,
}) => 
{
  const [nameInput,setNameInput] = useState(name)
  const [locationInput,setLocationInput] = useState(location)
  
  const [nameValidation, setNameValidation] = useState('')
  const [locationValidation, setLocationValidation] = useState('')

  const handleChangeName = (e) => {
    setNameInput(e.target.value)
  }

  const handleChangeLocation= (e) => {
    setLocationInput(e.target.value)
    }

  const handleOnSubmit =  (e) => {
    e.preventDefault()
    if(!nameInput.length) {setNameValidation('Nie wpisałeś nazwy pasieki')}
    if(!locationInput.length) {setLocationValidation('Nie wpisałeś lokalizacji')}
    const newData = {
      _id,
      name:nameInput,
      location:locationInput,
    }
    _id ? edit(newData) : add(newData,setNameInput,setLocationInput)
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
                      onChange={handleChangeLocation}
                      className="form-control"
                      id="location"
                      name="location"
                      value={locationInput||''}
                      placeholder="lokalizcja (wymagana)"
                      maxLength="30"
                      required
                    /><p>{locationValidation ? `${locationValidation}` : ''}</p>
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