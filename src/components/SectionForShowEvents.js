import React from 'react'

const Section = ({events,updateEvent, deleteEvent}) =>  {
    return(
      <div className="container fluid" style={{maxWidth:'720px'}}>
      <table className="table table-striped table-hover" style={{width:"100%"}}>
      <thead className="thead thead-light">
        <tr>
          <th>#</th>
          <th>Zadanie aktywe</th>
          <th>Opis</th>
          <th>Edytuj</th>
          <th>Usuń</th>
        </tr>
      </thead>
      <tbody>
        {events.map(
          function (event, index) {
            return (
              <tr key={index}>
                <td style={{width:"10%"}}>{index + 1}</td>
                <td style={{width:"20%"}}>{event.title}</td>
                <td style={{width:"70%"}}>{event.subject}</td>
                <td>
                  <button onClick={updateEvent} value={event._id}>
                  <span ><i className="fa fa-pencil fa-fw"></i>
                  </span>
                  </button>
                </td>
                <td>
                  <button onClick={deleteEvent} value={event._id}>
                  <span> <i className="fa fa-trash-o fa-lg"></i>
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

    )
  }

  export default Section