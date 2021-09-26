import React from 'react'

const SectionTasks = ({tasks,apiary,finishTask,updateTask, deleteTask}) =>  {
  
  let tableTasks
  const today = new Date().toISOString().slice(0,10)

  if (apiary==='noassignment') {tableTasks = tasks.filter(task=>(task.apiary===''))}
  else {tableTasks = tasks.filter(task=>(task.apiary===apiary || apiary==='all')) }
  
  if (tableTasks.length===0) { return <b>brak zadań do wyświetlenia</b>}
  else
  {
    return(
        <table className="table table-sm table-striped table-bordered">
        <thead className="thead thead-dark">
          <tr>
          <th scope="col">#</th>
          <th scope="col">Zadanie / Nr ula</th>
          <th scope="col">Wykonać do</th>
          <th scope="col">zakończ/edytuj/usuń</th>
          </tr>
        </thead>
        <tbody>
          {
            tableTasks.map((task,index) =>
            {
              return(
                <>
                <tr className="table-warning" key={task._id}>
                <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  {today < task.date ? 
                    <td>{task.date ? task.date : 'brak'}</td>
                    :
                    <td style={{color:'#ee0033'}}><b>{task.date ? task.date : 'brak'}</b></td>
                  }   
                  <td>
                  <button  className="mr-2" onClick={finishTask} value={task._id}>
                    <span ><i class="fa fa-check"></i>
                    </span>
                    </button>
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
                <tr className="table-secondary">
                 <td colSpan='5' style={{textAlign:'left'}}><b>Opis: </b> {task.subject}</td>
               </tr>
               </>
              )
            })
            }
        </tbody>
      </table>
      )
  } 
    
  }

  export default SectionTasks