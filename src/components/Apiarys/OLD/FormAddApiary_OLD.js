import React from 'react'

const FormAddApiary = ({handleName, name, handleLocation, location, handleAddButton, children}) => 
{
    return(   
      <div className="form-area mt-4">
        <h5>Podaj dane nowej pasieki</h5>
            <form>
              <br styles="clear:both" />
              <div className="form-group">
                <input
                  type="text"
                  onChange={handleName}
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="nazwa pasieki"
                  maxLength="20"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  onChange={handleLocation}
                  className="form-control"
                  id="location"
                  name="location"
                  value={location}
                  placeholder="lokalizacja"
                  maxLength="25"
                  required
                />
              </div>  
              <button
                type="button"
                onClick={handleAddButton}
                id="submit"
                name="submit"
                className="btn btn-primary pull-right"
              >
                Dodaj/Zmień
              </button>
            </form>
            <div>{children}</div>
          </div>
    ) 
  }

  export default FormAddApiary