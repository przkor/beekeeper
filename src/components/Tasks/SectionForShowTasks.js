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
      <p className="text-left">Kliknij na zadanie aby rozwinąć szczegóły..</p>
      <Container className="mb-2 text-left">
                <Row >
                 <Col xs={1} md={1} lg={1}><b>Nr</b></Col>
                 <Col xs={6} md={8}><b>Nazwa zad.</b></Col>
                 <Col xs={4} md={3}><b>Wykonać do</b></Col>
                </Row>
              </Container>
      {
         tableTasks.map((task,index) =>
         {
           return (
              <Accordion className="pb-2 text-left" key={index}>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={task._id}>
                            <Container>
                              <Row>
                                <Col xs={1} md={1} lg={1} className="p-0"  >{index+1}</Col>
                                <Col  xs={7} md={9} className="p-0">{task.title} ...</Col>
                                <Col xs={4} md={2} className="p-0">
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

                            <Accordion.Collapse className="text-center" eventKey={task._id} key={index}>
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
           )
         }
         )}  
        </>
      )
  }  
  }

  export default SectionTasks