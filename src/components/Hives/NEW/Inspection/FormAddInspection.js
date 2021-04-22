import React, {useEffect,useState} from 'react'
import PopUp from '../../../Modal/Modal'
import axios from 'axios'

const insTable = [
    {
        id:0,
        type1:'przegląd zwykły',
        type2: [
            {
                id:'0',
                name:'dodanie ramek'
            },
            {
                id:'1',
                name:'rozbudowa gniazda'
            },
            {
                id:'2',
                name:'dodanie ramki pracy'
            },
            {
                id:'3',
                name:'wycinanie ramki pracy'
            },
            {
                id:'4',
                name:'usunięcie ramki pracy'
            },
            {
                id:'5',
                name:'kontrola czerwienia'
            },
            {
                id:'6',
                name:'dołożenie korpusu'
            },
            {
                id:'7',
                name:'zacieśnienie gniazda'
            },
            {
                id:'8',
                name:'układanie do zimowli'
            },
            {
                id:'9',
                name:'inne'
            },

        ]
    },
    {
        id:1,
        type1:'przegląd zimowy',
        type2: [
            {
                id:'0',
                name:'spr. umiejscowienia kłębu'
            },
            {
                id:'1',
                name:'spr. ilości pokarmu'
            },
            {
                id:'2',
                name:'poddanie pokarmu'
            },
            {
                id:'3',
                name:'poddanie wody'
            },
        ]
    },
    {
        id:2,
        type1:'przegląd wiosenny',
        type2: [
            {
                id:'0',
                name:'spr. ilości pszczół'
            },
            {
                id:'1',
                name:'spr. ilości pokarmu'
            },
            {
                id:'2',
                name:'spr. czerwienia'
            },
            {
                id:'3',
                name:'poddanie wody'
            },
            {
                id:'4',
                name:'podkarmienie'
            },
            {
                id:'5',
                name:'rozbudowa gniazda'
            },
            {
                id:'6',
                name:'zacieśnienie gniazda'
            },
        ]
    },
    {
        id:3,
        type1:'podkarmianie',
        type2: [
            {
                id:'0',
                name:'pobudzające'
            },
            {
                id:'1',
                name:'zapas zimowy'
            },
            {
                id:'2',
                name:'wiosenne uzupełnienie'
            },
        ]
    },
    {
        id:4,
        type1:'midobranie',
        type2: [
        ]
    },
    {
        id:5,
        type1:'leczenie',
        type2: [
            {
                id:'0',
                name:'warrroza'
            },
            {
                id:'1',
                name:'nosema'
            },
            {
                id:'2',
                name:'grzybica'
            },
            {
                id:'3',
                name:'zgnilec europejski'
            },
            {
                id:'4',
                name:'zgnilec amerykański'
            },
            {
                id:'5',
                name:'wirusowe'
            },
            {
                id:'6',
                name:'inne'
            },
        ]
    },   
]


const FormAddInspection = (props) => {
    let data = new Date().toISOString().slice(0,10)
    const {hiveID,callback,handleSetInspections,handleShowPopUp} = props
    const [inspection,setInspection] = useState({
        hiveID,
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
            handleShowPopUp({
              status:true,
              title:'Sukces',
              message:'Dodano inspekcję',
              type:'confirmation'
            })
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

 const inspectionType = insTable.map(inspection => 
     (
      <option value={inspection.type1} data-id={inspection.id}>{inspection.type1}</option>
     )
 )

 let inspectionType2 

 if (type1ID!=='') {
    //const temporaryTable = insTable[type1ID].type2
    inspectionType2 = insTable[type1ID].type2.map(element =>
        <option value={element.name}>{element.name}</option>
    )
 }


  const handleAddInspection = (e) => {
    e.preventDefault()
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
    e.preventDefault()
    setInspection(prev => {
      return {
        ...prev,
        description: e.target.value,  
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
}

  useEffect(() => { 
    return function cleanUp() {}
    },[] 
    )
  
  const Section = () => {
    return (
      <div className="form-area mt-4">
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
                <label htmlFor="ins_description">Opis czynności</label> 
                <textarea
                  type='textarea'
                  onChange={handleDescription}
                  className="form-control"
                  id="ins_description"
                  name="ins_description"
                  value={inspection.description || ''}
                  maxLength="150"
                />
               </div>
              <button
                type="button"
                onClick={handleAddInspection}
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

export default FormAddInspection