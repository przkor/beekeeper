import  React from 'react';
import {Nav} from 'react-bootstrap' 
import {LinkContainer} from 'react-router-bootstrap'
import './style.css'

const MainNavigation = () => {

      return (

            
            
        
  <Nav className="justify-content-center" variant="tabs"  id="mainMenu" name="mainMenu" style={{display: 'none',color:"red", marginBottom:"20px" }} defaultActiveKey="/events">
    <Nav.Item>
      <LinkContainer to="/events"><Nav.Link className="navLink" eventKey="/events" >Zadania</Nav.Link></LinkContainer>
    </Nav.Item>
    <Nav.Item> 
      <LinkContainer to="/addevent"><Nav.Link className="navLink" eventKey="/addevent" >Dodaj zadanie</Nav.Link></LinkContainer>
    </Nav.Item>
    <Nav.Item>
      <LinkContainer to="/managers"><Nav.Link className="navLink" eventKey="/managers">Zarządzanie</Nav.Link></LinkContainer>
    </Nav.Item>
    <Nav.Item>
      <LinkContainer to="/settings"><Nav.Link className="navLink" eventKey="/settings" >Ustawienia</Nav.Link></LinkContainer>
    </Nav.Item>
    <Nav.Item>
      <LinkContainer to="/logout"><Nav.Link className="navLink" eventKey="/logout" >Wyloguj</Nav.Link></LinkContainer>
    </Nav.Item>
  </Nav>

      )
    }
    

    export default MainNavigation