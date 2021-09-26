import React, {useState,useEffect} from 'react'
import axios from 'axios'

const Section = ({data,apiaryID,
  handleTitleChange,handleSubjectChange,handleDateChange,handleApiaryChange,addEvent
}) => {
   
    const  defaultDate = new Date().toISOString().slice(0,10)
    const {title,subject,apiary,date} = data

    const [apiarys,setApiarys] = useState('')
  
    const getApiarys = () => {
      axios.get("/apiarys", { 
      })
      .then(function (response) {
          if (response.data==="access denied")
          {
              window.location.assign('/');
              return
          }
          if(response.status===200) {
            setApiarys(response.data)
          }
      })
      .catch(function (error) {
         console.log(error);
      });
    }

    const apiarysList = () => {
      if(apiarys.length>0) {
        const list = apiarys.map((apiary) => {
          if (apiaryID!==null && apiaryID !== apiary._id) {return null}
          else {
            return <option key={apiary._id} value={apiary._id}>{apiary.name}</option>
          } 
          
        })
        return list
      }
      return
    } 
    
    const handleSubmit = (e) => {
      e.preventDefault()
    }

    useEffect(()=>{
      getApiarys()
    })

    return (
      <div className="container fluid">
        <div><h4>Zadanie do wykonania</h4></div>
        <form onSubmit={handleSubmit}>
                  <div className="form-group" >
                  <label htmlFor="title">Nazwa zadania lub Nr Ula</label>
                    <input
                      type="text"
                      onChange={handleTitleChange}
                      className="form-control form-control-sm"
                      id="title"
                      name="title"
                      value={title || ''}
                      placeholder="Nazwij zadanie(max 30 znaków)"
                      maxLength='30'
                      required
                    />
                  </div>
                  <div className="form-group" >
                  <label htmlFor="apiary">Pasieka</label>
                    <select
                      value={apiary || ''}
                      onChange={handleApiaryChange}
                      className="form-control form-control-sm"
                      id="apiary"
                      name="apiary"
                    >
                      <option value=''>bez przypisania</option>
                      {
                        apiarysList()
                      }

                    </select>
                  </div>
    
                  <div className="form-group">
                  <label htmlFor="subject">Opis</label>
                    <textarea
                      className="form-control form-control-sm"
                      onChange={handleSubjectChange}
                      type="textarea"
                      id="subject"
                      name="subject"
                      value={subject || ''}
                      placeholder="Opisz zadanie"
                      maxLength="200"
                      rows="5"
                    ></textarea>
                  </div>
                  <label htmlFor="date">Wykonać do (data)</label>
                  <div className="form-group" >
                    <input
                      type="date"
                      onChange={handleDateChange}
                      className="form-control form-control-sm"
                      id="date"
                      name="date"
                      value={date || ''}
                      min={defaultDate}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addEvent}
                    id="submit"
                    name="submit"
                    className="btn btn-primary pull-right"
                    value=""
                  >
                    Zatwierdź/Dodaj
                  </button>
          </form>
      </div>
    ) 
  }

  export default Section