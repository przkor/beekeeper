import  React from 'react';
import {Nav,Navbar,Container,NavDropdown} from 'react-bootstrap' 
import {LinkContainer} from 'react-router-bootstrap'
import './style.css'

const MainNavigation = () => {

      return (
      <>         
      <Navbar bg="light" expand="md"  id="mainMenu" name="mainMenu" className="mb-4" style={{display:'none'}}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/tasks"><Nav.Link eventKey="/tasks">Zadania</Nav.Link></LinkContainer>
              <LinkContainer to="/addTask"><Nav.Link eventKey="/addTask">Dodaj zadanie</Nav.Link></LinkContainer>
                <NavDropdown title="Zarządzanie" id="basic-nav-dropdown">
                  <LinkContainer to="/manager/pasieki"><NavDropdown.Item>Pasieki</NavDropdown.Item></LinkContainer>
                  <LinkContainer to="/manager/matki"><NavDropdown.Item>Matki pszczele</NavDropdown.Item></LinkContainer>
                  <LinkContainer to="/manager/ule"><NavDropdown.Item>Ule</NavDropdown.Item></LinkContainer>
                  <LinkContainer to="/manager/leczenie"><NavDropdown.Item>Leczenie</NavDropdown.Item></LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              <LinkContainer to="/logout"><Nav.Link eventKey="/logout">Wyloguj</Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

{/*
  #OLD MENU
  <Nav className="navbar justify-content-center" variant="tabs"  id="mainMenu" name="mainMenu" 
  style={{display: 'none',color:"red", marginBottom:"20px" }} defaultActiveKey="/events"
  role="navigation"
  >
    <Nav.Item>
      <LinkContainer to="/tasks"><Nav.Link className="navLink" eventKey="/tasks" >Zadania</Nav.Link></LinkContainer>
    </Nav.Item>
    <Nav.Item> 
      <LinkContainer to="/addTask"><Nav.Link className="navLink" eventKey="/addTask" >Dodaj zadanie</Nav.Link></LinkContainer>
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
  </>
*/}
</>

      )
    }
    

    export default MainNavigation