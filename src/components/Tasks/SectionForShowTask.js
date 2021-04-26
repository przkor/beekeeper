import React from 'react'

const Section = ({tasks,updateTask, deleteTask}) =>  {
    return(
      <div className="container fluid" style={{maxWidth:'660px'}}>
      <table className="table table-striped table-hover" style={{width:"100%"}}>
      <thead className="thead thead-light">
        <tr>
          <th>#</th>
          <th>Tytuł</th>
          <th>Pasieka</th>
          <th>Termin</th>
          <th>Akcje</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(
          function (task, index) {
            return (
              <>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.apiary ? task.apiary : 'brak'}</td>
                <td>{task.date ? task.date : 'brak'}</td>
                <td>
                  <button onClick={updateTask} value={task._id}>
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
               <td colSpan='5'>Opis: {task.subject}</td>
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