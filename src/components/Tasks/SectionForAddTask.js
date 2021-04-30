import React, {useState,useEffect} from 'react'
import axios from 'axios'

const Section = ({title,subject,apiary,apiaryID,date,
  handleTitleChange,handleSubjectChange,handleDateChange,handleApiaryChange,addEvent
}) => {
   
    const  defaultDate = new Date().toISOString().slice(0,10)
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
            return <option key={apiary._id} value={apiary.name}>{apiary.name}</option>
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
      <div style={{"width":"100%"}}>
            <div>
              <h4>Zadanie do wykonania</h4>
            </div>
            <div className="col-md-12">
              <div className="form-area">
                <form onSubmit={handleSubmit}>
                  <br styles="clear:both" />
                  <div className="form-group" >
                  <label htmlFor="title">Nazwa/Nr Ula</label>
                    <input
                      type="text"
                      onChange={handleTitleChange}
                      className="form-control"
                      id="title"
                      name="title"
                      value={title || ''}
                      placeholder="Nazwij zadanie"
                      maxLength='75'
                      required
                    />
                  </div>
    
                  <div className="form-group">
                  <label htmlFor="subject">Opis</label>
                    <textarea
                      className="form-control"
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
                  <div className="form-group" >
                  <label htmlFor="apiary">Pasieka</label>
                    <select
                      value={apiary || ''}
                      onChange={handleApiaryChange}
                      className="form-control"
                      id="apiary"
                      name="apiary"
                    >
                      <option value=''>bez przypisania</option>
                      {
                        
                        apiarysList()
                      }

                    </select>
                  </div>
                  <label htmlFor="date">Wykonać do (data)</label>
                  <div className="form-group" >
                    <input
                      type="date"
                      onChange={handleDateChange}
                      className="form-control"
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
            </div>
          </div>
    ) 
  }

  export default Section