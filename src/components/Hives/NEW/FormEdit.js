
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editHive} from './actions/hivesActions'

//import treatmentFromDatabase from './TreatmentDatabase'

const FormEdit = ({
  editHive,
  apiarys,
  _id,
  number,
  type,
  mother,
  motherYear,
  power,
  status,
  apiary,
  callback, }) => 
{
  const [hive,setHive] = useState({
    _id,
    number,
    type,
    mother,
    motherYear,
    power,
    status,
    apiary,
  })



  const handleType = (e) => {
    setHive(prevHive => {
      return {
        ...prevHive,
        type: e.target.value, 
         
      }
    })
  }
  
  const handleMother = (e) => {
    setHive(prevHive => {
      return {
        ...prevHive,
         mother: e.target.value,  
      }
    })
      
  }

  const handleMotherYear = (e) => {
    setHive(prevHive => {
      return { 
       ...prevHive,   
        motherYear: e.target.value ,   
        
      }
    })
  }

  const handlePower = (e) => {
    setHive(prevHive => {
      return {
        ...prevHive,
        power: e.target.value,  
      }
    })
  }

  const handleStatus = (e) => {
    setHive(prevHive => {
      return {
        ...prevHive,
        status: e.target.value,  
      }
    })
  }

  const handleApiary = (e) => {
    setHive(prevHive => {
      return {
        ...prevHive,
        apiary: e.target.value,  
      }
    })
  }

  const handleOnSubmit =  (e) => {
   // e.preventDefault()
    editHive(hive) 
    callback()
  }

  return (
    <div className="form-area mt-4">
          <form>
            <br styles="clear:both" />
            <div className="form-group hive">
              <label htmlFor="type">Typ ramki</label> 
              <select
                type="text"
                onChange={handleType}
                className="form-control"
                id="type"
                name="type"
                value={hive.type || ""}
                placeholder='wybierz'
                maxLength="20"
              >
                <option value=''>wybierz</option>
                <option value='apipol'>Apipol</option>
                <option value='dadant'>Dadant</option>
                <option value='langstroth'>Langstroth</option>
                <option value='ostrowska'>Ostrowska</option>
                <option value='warszawska'>Warszawska</option>
                <option value='wielkopolska'>Wielkopolska</option>
                <option value='słowian'>Słowian</option>
                <option value='inna'>Inna</option>
              </select>
             </div>
            <div className="form-group hive">
              <label htmlFor="mother">Rasa matki</label>
              <select
                type="text"
                onChange={handleMother}
                className="form-control"
                id="mother"
                name="mother"
                value={hive.mother||''}
                placeholder='wybierz'
                maxLength="25"
              >
               <option value='nieznana'>wybierz</option>
               <option value='Aga'>Aga</option>
               <option value='Alpejka'>Alpejka</option>
               <option value='CT46'>CT46</option>
               <option value='Dobra'>Dobra</option>
               <option value='Karpatka'>Karpatka</option>
               <option value='Reproduktorka'>REPRODUKTORKA</option> 
               <option value='Sklenar'>Sklenar</option> 
               <option value='Troiseck'>Troiseck</option> 
               <option value='Vigor'>Vigor</option>
               <option value='Własna'>Własna</option>
              </select>
              
            </div>
            <div className="form-group hive">
              <label htmlFor="motherYear">Rok matki</label>
              <select
                onChange={handleMotherYear}
                className="form-control"
                id="motherYear"
                name="motherYear"
                value={hive.motherYear||''}
                placeholder='wybierz'
                maxLength="4"
              >
               <option value='nieznany'>nieznany</option>
               <option value='2016'>2016</option>
               <option value='2017'>2017</option>
               <option value='2018'>2018</option>
               <option value='2019'>2019</option>
               <option value='2020'>2020</option>
               <option value='2021'>2021</option>
              </select>
            </div> 
            <div className="form-group hive">
            <label htmlFor="power">Siła rodziny</label>
              <select
                type="text"
                onChange={handlePower}
                className="form-control"
                id="power"
                name="power"
                value={hive.power||''}
                placeholder="siła rodziny"
                maxLength="20"          
              >
               <option value=''>wybierz</option>
               <option value='odkład'>odkład</option>
               <option value='bardzo silna'>bardzo silna</option>
               <option value='silna'>silna</option>
               <option value='średnia'>średnia</option>
               <option value='słaba'>słaba</option>
              </select>
            </div> 
            <div className="form-group hive">
            <label htmlFor="status">Status</label>
              <select
                type="text"
                onChange={handleStatus}
                className="form-control"
                id="status"
                name="status"
                value={hive.status||''}
                placeholder="status"
                maxLength="30"
              >
               <option value=''>wybierz</option>
               <option value='produkcyjna'>rodzina produkcyjna</option>
               <option value='wychowująca'>rodzina wychowująca</option>
               <option value='reprodukcyjna'>rodzina reprodukcyjna</option>
               <option value='odkład'>odkład</option>
               <option value='matka do wymiany'>matka do wymiany</option>
               <option value='trutówka'>trutówka</option> 
               <option value='bezmateczny'>bezmateczny</option> 
               <option value='grzybica'>grzybica</option>
               <option value='nosema'>nosema</option>
               <option value='zgnilec europejski'>zgnilec europejski</option>
               <option value='zgnilec amerykański'>zgnilec amerykański</option>
               <option value='choroba nieznana'>choroba nieznana</option>
              </select>
            </div>
            <div className="form-group hive">
            <label htmlFor="pasieka">Przypisz do pasieki</label>
              <select
                type="text"
                onChange={handleApiary}
                className="form-control"
                id="apiary"
                name="apiary"
                value={hive.apiary||''}
                placeholder="wybierz"
                maxLength="30"
              >
               {       
                apiarys.map((apiary, index) => {
                const {name,_id} = apiary
                return (
                  <option key={index} value={_id}>{name}</option>
                );
                }
               )     
              }
              </select>
            </div>    
            <button
              type="button"
              onClick={handleOnSubmit}
              id="submit"
              name="submit"
              className="btn btn-primary pull-right"
            >
              Zapisz
            </button>
          </form>
        </div>
  )
  }

  const connectActionsToProps = ({
    editHive,
  })

  const connectReduxStateToProps = store => ({
    apiarys:store.apiarys
})


  const FormEditHive = connect(connectReduxStateToProps,connectActionsToProps)(FormEdit)

  export default FormEditHive
