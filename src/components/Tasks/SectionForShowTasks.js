import React from 'react'
import {Accordion,Card,Container,Row,Col} from 'react-bootstrap'

const SectionTasks = ({tasks,apiary,finishTask,updateTask, deleteTask}) =>  {
  
  let tableTasks
  const today = new Date().toISOString().slice(0,10)

  if (apiary==='noassignment') {tableTasks = tasks.filter(task=>(task.apiary===''))}
  else {tableTasks = tasks.filter(task=>(task.apiary===apiary || apiary==='all')) }
  
  if (tableTasks.length===0) { return <b>brak zadań do wyświetlenia</b>}
  else
  {
    return(
      <>
      <p style={{textAlign:"left"}}>Kliknij zadanie aby rozwinąć szczegóły..</p>
      <Container className="pb-3">
                <Row>
                 <Col xs={2} className="p-0"><b>Nr zad.</b></Col>
                 <Col xs={6} className="p-0"><b>Nazwa zad.</b></Col>
                 <Col className="p-0"><b>Wykonać do</b></Col>
                </Row>
              </Container>
      {
         tableTasks.map((task,index) =>
         {
           return (
             <>
              <Accordion className="pb-1" key={task._id}>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={task._id}>
                            <Container>
                              <Row>
                                <Col xs={2} className="p-0" >Nr {index+1}</Col>
                                <Col xs={6} className="p-0">{task.title} ...</Col>
                                <Col className="p-0">
                                {
                                  today < task.date 
                                  ? 
                                    <p>{(task.date ? task.date : 'brak')}</p>
                                  :
                                    <p style={{color:'#ee0033'}}><b>{task.date ? task.date : 'brak'}</b></p>
                                }  
                                </Col>
                              </Row>
                            </Container>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey={task._id} key={index}>
                                <Card.Body>
                                  <p>{task.subject}</p>
                                  <button  className="m-1"  onClick={finishTask} value={task._id}>
                                  <span><i className="fa fa-check "></i>
                                  </span>
                                  </button>
                                  <button  className="m-1" onClick={updateTask} value={task._id}>
                                  <span><i className="fa fa-pencil fa-fw"></i>
                                  </span>
                                  </button>
                                  <button className="m-1" onClick={deleteTask} value={task._id}>
                                  <span> <i className="fa fa-trash-o fa-lg"></i>
                                  </span>
                                  </button>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                </Accordion>
             </>
           )
         }
         )}  
        </>
      )
  }  
  }

  export default SectionTasks