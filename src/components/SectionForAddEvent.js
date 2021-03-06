import React from 'react'

const Section = ({handleTitleChange, title,handleSubjectChange,subject,addEvent}) => {
    const handleSubmit = (e) => {
      e.preventDefault()
  }
    return (
      <div style={{"width":"100%"}}>
            <div>
              <h4>Zadanie do wykonania</h4>
            </div>
            <div className="col-md-7">
              <div className="form-area">
                <form onSubmit={handleSubmit}>
                  <br styles="clear:both" />
                  <div className="form-group" >
                    <input
                      type="text"
                      onChange={handleTitleChange}
                      className="form-control"
                      id="title"
                      name="title"
                      value={title || ''}
                      placeholder="Nazwij zadanie"
                      maxLength='20'
                      required
                    />
                  </div>
    
                  <div className="form-group">
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
    
                  <button
                    type="button"
                    onClick={addEvent}
                    id="submit"
                    name="submit"
                    className="btn btn-primary pull-right"
                    value=""
                  >
                    Dodaj/Zmień
                  </button>
                </form>
              </div>
            </div>
          </div>
    ) 
  }

  export default Section