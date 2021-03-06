import React, {useState} from 'react'
import quensFromDatabase from './QuensDatabase'

const FormAddQuen = ({addHandler}) => 
{
    const [line,SetLine] = useState()
    const [delivery,SetDelivery] = useState()
    const handleLine = (e) => {
        SetLine(e.target.value)
    }
    const handleDelivery = (e) => {
        SetDelivery(e.target.value)
    }
    const handleAddButton = async () => {
        const quenData = {
            line,
            delivery
        }
        await quensFromDatabase.addQuen(quenData,addHandler)
        SetLine('')
        SetDelivery('')
    }

    return(   
      <div className="form-area mt-4">
        <h5>Podaj dane nowej Matki</h5>
            <form>
              <br styles="clear:both" />
              <div className="form-group">
                <input
                  type="text"
                  onChange={handleLine}
                  className="form-control"
                  id="line"
                  name="line"
                  value={line||''}
                  placeholder="linia"
                  maxLength="25"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  onChange={handleDelivery}
                  className="form-control"
                  id="delivery"
                  name="delivery"
                  value={delivery||''}
                  placeholder="dostawca"
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
                Dodaj
              </button>
            </form>
          </div>
    ) 
  }

  export default FormAddQuen