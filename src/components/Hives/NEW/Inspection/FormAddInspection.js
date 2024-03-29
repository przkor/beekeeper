import React, {useEffect, useState} from 'react'
import PopUp from '../../../Modal/Modal'
import axios from 'axios'
import { Button, Container} from 'react-bootstrap'
import inspectionTable from './Const/inspectionTable'

const FormAddInspection = (props) => {
    let data = new Date().toISOString().slice(0,10)
    const {hiveID,callback,handleSetInspections,handleShowPopUp} = props
    const [inspection,setInspection] = useState({
        hiveID,
        _id:Date.now(),
        ins_data: data,
        ins_type1:'',
        ins_type2:'',
        description:''
    })
    
const [type1ID,setType1ID] = useState('')  
const [popUp,setPopUp] = useState({
   status:false,
   title:'',
   message:'',
   type:''
 })

 const close = () => {callback(false)}

 const addInspection= (inspection) => {
    data = new Date().toISOString().slice(0,10)
    callback(false)
    axios.post("/inspection", {
        data:
            { 
                inspection
            }
    })
    .then(function (response) {
        if (response.data==="access denied")
        {
            window.location.assign('/'); 
            return
        }
        else if(response.data===false) {
            setPopUp({
                status:true,
                title:'Błąd',
                message:'Błąd podczas dodawania do bazy',
                type:'danger'
            })
            return; 
        }
        else {
            /*
            handleShowPopUp({
              status:true,
              title:'Sukces',
              message:'Dodano inspekcję',
              type:'confirmation'
            })
            */
            handleSetInspections( prev => {
               let table = [...prev]
               table.push(inspection)
               return table
              })
            callback(false)
            setInspection({
                ins_data: '',
                ins_type1:'',
                ins_type2:'',
                description:'' 
            })
        }
    })
    .catch(function (error) {
       console.log(error);
    });
 }

 const inspectionType = inspectionTable.map(inspection => 
     (
      <option key={inspection.id} value={inspection.type1} data-id={inspection.id}>{inspection.type1}</option>
     )
 )

 let inspectionType2 

 if (type1ID!=='') {
    //const temporaryTable = insTable[type1ID].type2
    inspectionType2 = inspectionTable[type1ID].type2.map(element =>
        <option key={element.id} value={element.name}>{element.name}</option>
    )
 }

 const handleSubmit = (e) => {
    e.preventDefault()
 }

  const handleAddInspection = (e) => {   
    if (inspection.ins_type1) {
      addInspection (inspection)
    }
    else {
      setPopUp({
        status:true,
        title:'Warning',
        message:'Nie wszystkie pola zostały wypełnione',
        type:'warning'
      })
    }
  }

  const handleType1 = (e) => {
    const type1ID = e.target[e.target.selectedIndex].getAttribute('data-id')
    setType1ID(type1ID)
    setInspection(prev => {  
      return {
        ...prev,
        ins_type1: e.target.value
      }
    })
  }

  const handleType2 = (e) => {
    setInspection(prev => {
      return {  
        ...prev,
        ins_type2: e.target.value,  
      }
    })
  }

  const handleDescription = (e) => {
    setInspection(prev => ({
        ...prev,
        description: e.target.value,  
    }))
  }



  useEffect(() => { 
    return function cleanUp() {}
    },[] 
    )

  return (
    <Container fluid className="m-0 mt-2 p-1 pb-5 " style={{backgroundColor:"lightgrey"}}>
    <div className="form-area mt-3 mb-3">
      <h5>Nowa inspekcja</h5>
      <form onSubmit={handleSubmit}>
            <div className="form-group hive">
              <label htmlFor="ins_type1">Typ inspeckcji</label> 
              <select
                type="text"
                onChange={handleType1}
                className="form-control"
                id="ins_type1"
                name="ins_type1"
                value={inspection.ins_type1 || ''}
                placeholder='wybierz'
                maxLength="30"
              >
                  <option value = '' data-id=''>wybierz</option>
                   {inspectionType}
              </select>
             </div>
              {
               type1ID!==''
               ?
                  <div className="form-group hive">
                      <label htmlFor="ins_type2">Podtyp inspeckcji</label> 
                      <select
                          type="text"
                          onChange={handleType2}
                          className="form-control"
                          id="ins_type2"
                          name="ins_type2"
                          value={inspection.ins_type2 || ""}
                          placeholder='wybierz'
                          maxLength="30"
                          >
                              <option value="">wybierz</option>
                              {inspectionType2} 
                      </select>
              </div>
              :
              null
             }
             <div className="form-group hive">
              <label htmlFor="description">Szczegóły</label> 
              <textarea
              type="textarea"
              onChange={handleDescription}
              className="form-control"
              id="description"
              name="description"
              value={inspection.description || ''}
              maxLength='150'
              />
             </div>
            <Button
              type="button"
              onClick={handleAddInspection}
              id="submit"
              name="submit"
              variant="success"
              className="pull-right m-1"
            >
              Dodaj
            </Button>
            <Button variant="secondary" className="pull-right m-1 mr-2" onClick={close}>Zamknij</Button>
      </form>        
   </div>
   <div>
   {
        popUp.status 
         ? 
         <PopUp parameters={popUp}
             callback={setPopUp}/> 
          : 
          null
   }
  </div>
  </Container>
   
)
}

export default FormAddInspection