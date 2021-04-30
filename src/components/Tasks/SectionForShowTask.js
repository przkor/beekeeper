import React from 'react'

const Section = ({tasks,apiary,updateTask, deleteTask}) =>  {
  
  const today = new Date().toISOString().slice(0,10)
    return(
      <div className="container fluid" style={{maxWidth:'580px'}}>
      <table className="table table-hover striped" style={{width:"100%"}}>
      <thead className="thead thead-dark">
        <tr>
          <th>#</th>
          <th>Nazwa</th>
          <th>Pasieka</th>
          <th>Termin</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(
          function (task, index) {
            if ((task.apiary !== apiary)&&(apiary!=='all')) {return null}
            return (
              <>
              <tr style={{backgroundColor:'grey'}} key={index}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.apiary ? task.apiary : 'brak'}</td>
                {today < task.date ? 
                  <td>{task.date ? task.date : 'brak'}</td>
                  :
                  <td style={{color:'#ee0033'}}><b>{task.date ? task.date : 'brak'}</b></td>
              }   
                <td>
                  <button  className="mr-2" onClick={updateTask} value={task._id}>
                  <span ><i className="fa fa-pencil fa-fw"></i>
                  </span>
                  </button>
                  <button onClick={deleteTask} value={task._id}>
                  <span> <i className="fa fa-trash-o fa-lg"></i>
                  </span>
                  </button>
                </td>
              </tr>
              <tr>
               <td colSpan='5' style={{textAlign:'left'}}><b>Treść zadania: </b> {task.subject}</td>
             </tr>
             </>
            );
          }
        )}
      </tbody>
    </table>
    </div>

    )
  }

  export default Section