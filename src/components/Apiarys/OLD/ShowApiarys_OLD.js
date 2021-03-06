import React, {useState, useEffect, useCallback} from 'react'
import apiarysFromDatabase from './ApiarysDatabase'

  const ShowApiarys = ({addedApiary}) => {
    const [apiarys, setApiarys] = useState ([])
    const [hivesAmount, setHivesAmount] = useState ([])
    const [deleteApiary, setDeleteApiary] = useState(false)

    const toggleDeleteApiary = () => {
      setDeleteApiary(prevValue => !prevValue)
    }
  
    const getApiary = useCallback(() => {
      apiarysFromDatabase.getApiarys(setApiarys)
      /*
      axios
        .post("/getApiary", {})
        .then(function (response) {
          if (response.data==="access denied")
          {
            history.push('/')
            return
          }
          setApiarys(response.data)
        })
        .catch(function (error) {
          console.log("Error is ", error);
        });
        */
      },[]
    )

    const getHivesAmountInApiary =  useCallback(() => {
      apiarysFromDatabase.getHivesAmount(setHivesAmount)        
    },[]
    )

    const handleDeleteApiary = (e) => {
      const id = e.currentTarget.value
      if (window.confirm("Jesteś pewien aby usunąć ?")) {
         apiarysFromDatabase.deleteApiary(id,toggleDeleteApiary)
      }
    }

    useEffect(() => {
        getApiary()
        getHivesAmountInApiary()
        console.log('Renderuje ShowApiarys')
      }
      ,
      [getApiary,getHivesAmountInApiary,deleteApiary,addedApiary]
      )
  
    return (
        <div>
          <table className="table table-striped table-hover">
            <thead className="thead thead-light">
              <tr>
                <th>#</th>
                <th>Pasieka</th>
                <th>Lokalizacja</th>
                <th>Ule</th>
                <th>Akcja</th>
              </tr>
            </thead>
            <tbody>
              {apiarys.map(
               (apiary, index) => {
                  let hivesTotal = 0
                  const {_id,name,location} = apiary
                  for (let i=0;i<hivesAmount.length;i++)
                  {
                    if (hivesAmount[i]._id === _id) {hivesTotal=hivesAmount[i].amount}
                  }
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{location}</td>
                      <td>{hivesTotal} szt.</td>
                      <td> 
                        <button 
                          onClick={handleDeleteApiary}
                          value = {_id}
                        >  
                          <span className="glyphicon glyphicon-remove">
                            <i className="fa fa-trash-o fa-lg"></i>
                          </span> 
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      );
  }

  export default ShowApiarys
