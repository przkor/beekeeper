import React, {useCallback, useEffect, useState} from 'react'
import apiarysFromDatabase  from '../../Apiarys/ApiarysDatabase'
import hivesFromDatabase  from './HivesFromDatabase'

const Section = () => {
    const [apiarys,setApiarys] = useState([])
    const [apiary,setApiary] = useState([])
    const [hives,setHives] = useState([])
    
    const handleApiary = (e) => {
        if (e.target.value!=='') {
            document.getElementById('table').style.display='block';
            hivesFromDatabase.getHives(setHives,e.target.value)
        }
        else {
            document.getElementById('table').style.display='none';
            setHives([])

        }
        setApiary(e.target.value)
    }

    const handleEdit = (e) => {
    }

    const handleDelete =  (e) => {
        const hiveID = e.currentTarget.value
        if (window.confirm("Jesteś pewien aby usunąć ?")) {
            hivesFromDatabase.deleteHive(hiveID)
            hivesFromDatabase.getHives(setHives,apiary)
        }   
    }

    const getData = useCallback(() => {
        apiarysFromDatabase.getApiarys(setApiarys)
        },[]
    )
      
    useEffect(() => { 
        document.getElementById('table').style.display='none';
        getData()
        },[getData]
    )
    return (
    
        
    <div className="container" style={{"marginTop":"20px" ,"marginBottom":"20px"}}>
    <form style={{"marginTop":"20px", "marginBottom":"20px"}}>
    <h6>Wybierz pasieke:</h6>
      <select
      onChange={handleApiary}
      className="form-control"
      id="pasieka"
      name="pasieka"
      placeholder="wybierz"
      >
      <option value=''>wybierz</option>
      {
        apiarys.map((apiary, index) => {
        const {name,_id} = apiary
        return (
        <option key={index} value={_id}>{name}</option>
        );
        }
        )
      }
      <option value='all'>wszystkie</option>
    </select>
    </form>
    <table className="table table-hover" id="table">
        <thead>
          <tr>
              <th>Nr ID</th>
              <th>typ</th>
              <th>siła</th>
              <th>status</th>
              <th></th>
              <th></th>
         </tr>
        </thead>
    <tbody>
     {
         hives.map((hive, index) => {
            const {_id,number,type,power,status} = hive
            return (
              <tr key={index}>
                <th scope="row">{number}</th>
                <td>{type}</td>
                <td>{power}</td>
                <td>{status}</td>
                <td>
                    <button onClick={handleEdit} value={_id}>
                        <span><i className="fa fa-pencil fa-fw"></i></span>
                    </button>
                </td>
                <td>
                    <button onClick={handleDelete} value={_id}>
                        <span><i className="fa fa-trash-o fa-lg"></i></span>
                    </button>
                </td>
              </tr>
             );
        })
    }
  </tbody>
</table>
  </div> 
    )
}

export default Section