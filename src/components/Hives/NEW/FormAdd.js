import React, {useLayoutEffect,useEffect,useState} from 'react'
import PopUp from '../../Modal/Modal'
import axios from 'axios'

const FormAdd = () => {

  useLayoutEffect(() => {
    document.getElementById('showHives').className='nav-link';
    document.getElementById('migrationHives').className='nav-link';
    document.getElementById('addHive').className='nav-link active';
  },[])

  const [hive,setHive] = useState({
    number:'',
    type:'',
    mother:'',
    motherYear:'',
    power:'',
    status:'',
    apiary:'',
    isActive:true,
  })


 const [apiarys,setApiarys] = useState('')
 const [quens,setQuens] = useState({})
 const [popUp,setPopUp] = useState({
   status:false,
   title:'',
   message:'',
   type:''
 })


 const getApiarys = () => {
  axios.get("/apiarys")
  .then(function (response) {
      if (response.data==="access denied")
      {
          window.location.assign('/');
          return
      }
      else {
          setApiarys(response.data)
      }
  })
  .catch(function (error) {
     console.log(error);
  });
}

const getQuens = () => {
  axios
  .get("/quens", {
  })
  .then(function (response) {
      if (response.data==="access denied")
      {
          window.location.assign('/');
          return
      }
      setQuens(response.data)
  })
  .catch(function (error) {
     console.log(error);
  });
}

 const addHive= (data) => {
    const dbCollection = 'hives'
    axios.post("/hives", {
        data,
        dbCollection
    })
    .then(function (response) {
        if (response.data==="access denied")
        {
            window.location.assign('/'); 
            return
        }
        else if(response.data===false) {
            alert('Błąd podczas dodawani do bazy')
            return; 
        }
        else {
            setPopUp({
              status:true,
              title:'Sukces',
              message:'Dodano nową rodzinę',
              type:'confirmation'
            })
            setHive({
                number:'',
                type:'',
                mother:'',
                motherYear:'',
                power:'',
                status:'',
                apiary:'',
                isActive:true,
            })
        }
    })
    .catch(function (error) {
       console.log(error);
    });

 }

  const handleNumberButton = (e) => {
    e.preventDefault()
    axios
    .get("/hives/getFreeHiveNumber")
    .then(function (response) {
      if (response.data.number===false) {
        setHive(prevHive => {
          return {
            ...prevHive,
            number: response.data.count,  
          }
        })
      }
      else {
        setHive(prevHive => {
          return {
            ...prevHive,
            number: response.data.number
          }
        })
      } 
    })
    .catch(function (error) {
       console.log(error);
    });
  } 

 

  const handleAddHive = () => {
    if (hive.number && hive.type && hive.mother && hive.motherYear && hive.power && hive.status && hive.apiary) {
      addHive(hive)
    }
    else {
      setPopUp({
        status:true,
        title:'Błąd',
        message:'Nie wszystkie pola zostały wypełnione',
        type:'warning'
      })
    }
    
  }

  const handleNumber = (e) => {
    setHive(prevHive => {
      return {
        number: parseInt(e.currentTarget.value), 
        ...prevHive, 
      }
    })
  }

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

  useEffect(() => { 
    getApiarys()
    getQuens()
    return function cleanUp() {}
    },[] 
    )
  
  const Section = () => {
    return (
      <div className="form-area mt-4">
        <h5>Dodawanie nowego Ula</h5>
            <form>
              <br styles="clear:both" />
              <div className="form-group hive">
                <div className="hiveNumberInput">
                  <label htmlFor="number">Numer ula</label>
                  <input
                    type="text"
                    onChange={handleNumber}
                    className="form-control"
                    id="number"
                    name="number"
                    value={hive.number || ''}
                    placeholder="numer ula"
                    maxLength="3"
                    required
                    readOnly
                    disabled
                    />
                </div>
                <div className="hiveNumberButton">
                  <p><br></br></p>
                 <button className="btn btn-primary" onClick={handleNumberButton}>Pobierz z puli</button>
                 
                </div>
              </div>
  
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
              <option value=''>wybierz</option>  
              { 
              quens.length>0 ?
                quens.map((quen, index) => {
                  const {line} = quen
                  return ( <option key={index} value={line}>{line}</option>);
                }) 
                :
                null   
              }
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
                  id="pasieka"
                  name="pasieka"
                  value={hive.apiary||''}
                  placeholder="wybierz"
                  maxLength="30"
                >
                 <option value=''>wybierz</option>
                 {
                 apiarys ? 
                  apiarys.map((apiary, index) => {
                    const {name,_id} = apiary
                    return (
                      <option key={index} value={_id}>{name}</option>
                    );
                })  
                : null
                }
                </select>
              </div>    
              <button
                type="button"
                onClick={handleAddHive}
                id="submit"
                name="submit"
                className="btn btn-primary pull-right"
              >
                Dodaj
              </button>
            </form>
          {
            popUp.status 
            ? 
              <PopUp parameters={popUp}
                callback={setPopUp}/> 
            : 
              null
          }
          </div>
    )
  }

  return (
    <Section/>  
    )
}

export default FormAdd