import React, {useState} from 'react'
import FormEdit from './FormEdit'
import ShowInspection from './Inspection/ShowInspection'
import {delHive} from './actions/hivesActions'
import {connect} from 'react-redux'
import { Accordion,Card,Col,Container,Row } from 'react-bootstrap'
import PopUp from '../../Modal/ModalConfirmation'


const collection = 'hives'

const Element = ({_id,number,type,mother,motherYear,power,status,apiary,delHive}) => {

    const [isVisibleFormEdit,setIsVisibleFormEdit]= useState(false)
    const [isVisibleInspection,setIsVisibleInspection]= useState(false)
    const [popUp,setPopUp] = useState({
        status:false,
        title:'',
        message:'',
        type:'',
      })

    const toggleInspectionButton = () => {   
        setIsVisibleFormEdit(false)   
        setIsVisibleInspection(current=>!current)
    }
    const toggleEditButton = () => {  
        setIsVisibleInspection(false)    
        setIsVisibleFormEdit(current=>!current)
    }

    const handleDeleteModal = (e) => {
        //e.prevent.default()
        setPopUp({
            status:true,
            title:'Ostrzeżenie',
            message:'Czy na pewno usunąć?',
            type:'warning',
        })
    }

    const handleDelete = () => {  
        let id =_id
        delHive(id,number,collection)
    }

    

    const formEdit = () => {
        if (isVisibleFormEdit) {
            return (<FormEdit 
                _id={_id} 
                number={number} 
                type={type} 
                mother={mother}
                motherYear={motherYear}
                power={power}
                status={status}
                apiary={apiary}
                callback={toggleEditButton}
            />)
        }
    }

    const inspection = () => {
        if (isVisibleInspection) {
            return (<ShowInspection
                hiveID={number}
                apiary = {apiary}
                callback={toggleInspectionButton}
            />)
        }
    }

    const inspectionButton = <button style={{margin:"2vh",fontSize:'1.3rem'}} onClick={toggleInspectionButton}><span ><i className="fa fa-wrench" aria-hidden="true"></i></span></button>
    const editButton = <button style={{margin:"2vh",fontSize:'1.3rem'}} onClick={toggleEditButton}><span ><i className="fa fa-pencil fa-fw"></i></span></button>
    const deleteButton = <button style={{margin:"2vh", fontSize:'1.3rem'}} onClick={handleDeleteModal}><span><i className="fa fa-trash-o fa-lg"></i></span></button>
    

    return (
        <>
         <Accordion className="p-0 m-0 m-md-2 p-md-2 mb-3  text-center " key={_id}>
                        <Card className="p-0 m-0">
                            <Accordion.Toggle className="m-0 p-0" as={Card.Header} eventKey={_id}>
                              <Row className="p-0 m-0">
                                <Col xs={2} md={1} lg={1} className="p-1">ID*<br/><b>{number}</b></Col>
                                <Col className="p-1">typ:<br/><b>{type}</b></Col>
                                <Col className="p-1">matka:<br/><b>{motherYear}r.</b></Col>
                                <Col  className="p-1">siła:<br/><b>{power}</b></Col>
                                <Col className="p-1 d-none d-md-block">status:<br/><b>{status}</b></Col>
                              </Row>
                            </Accordion.Toggle>

                            <Accordion.Collapse className="text-center p-0 m-0" eventKey={_id}>
                                <Card.Body className="m-0 p-0 m-md-2 p-md-2"  >
                                    <p style={{textAlign:'left'}}><b>Rasa matki: </b>{mother} ,  <b>Status: </b>{status}</p>
                                    {isVisibleInspection ? '' : inspectionButton}
                                    {isVisibleFormEdit ? '' : editButton}
                                    {deleteButton}
                                    <Container  className="m-0 p-0 m-md-2 p-md-2" >
                                    {
                                        isVisibleFormEdit ? formEdit() : null
                                    }
                                    {
                                        isVisibleInspection ? inspection() :null
                                    }
                                    </Container>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
        </Accordion>
        {          
            popUp.status 
            ? 
              <PopUp parameters={popUp} action={handleDelete}
                callback={setPopUp}/> 
            : 
              null
          }     
                
        </>       
    )
}

const connectActionsToProps = ({
    delHive
  })

const ElementWithReduxAction = connect(null,connectActionsToProps)(Element)
export default ElementWithReduxAction