import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AddTask from '../../pages/AddTask'

export default function PopUpAddTask(props) {
  const {title,message,type,hiveID,apiary} = props.parameters
  let callback = props.callback
  let wariant
  let titleColor
  switch(type) {
    case 'confirmation' : wariant='success' ; titleColor='green'; 
      break
    case 'warning' : wariant='warning' ; titleColor='black'; 
      break
    case 'danger' : wariant='danger' ; titleColor='red'; 
      break
    default: wariant ='secondary' ; titleColor='black'; 

  }

    const [show, setShow] = useState(true);
  
    const handleClose = () => {
      setShow(false);
      callback(prev => {
          return {
            ...prev,
            status:false,
          }    
      })
    }

    /*const handleShow = () => setShow(true);*/
    
    return (
      <>
      {/*
        <Button variant="warning" onClick={handleShow}>
          Launch static backdrop modal
        </Button>
      */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title><h3 style={{color:`${titleColor}`}}>{title}</h3></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message}
            <AddTask hiveID={hiveID} apiary={apiary}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant={wariant} onClick={handleClose}>
              Powrót
            </Button>
            {/*
            <Button variant="secondary">Understood</Button>
            */
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  