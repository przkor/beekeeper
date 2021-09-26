import React,{useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function PopUp(props) {
  const {title,message,type} = props.parameters
  let callback = props.callback
  let action = props.action
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant={wariant} onClick={action}>OK</Button>
            <Button variant="secondary" onClick={handleClose}>Anuluj</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  