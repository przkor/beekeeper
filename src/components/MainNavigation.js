import  React from 'react';
import {NavLink} from 'react-router-dom';

const MainNavigation = () => {

      return (
              <nav className="navbar-toggleable-md navbar-expand-lg navbar-light bg-light mt-4 mb-3 "
              id="mainMenu" name="mainMenu" style={{display: 'none', }}>
               <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Pokaż lub ukryj nawigację">
        <span className="navbar-toggler-icon"></span>
      </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li  id="eventsLink" className="nav-item">
                  <NavLink to="/events"  className="nav-link">{"Zadania"}</NavLink>
                </li>
                <li id="addLink" className="nav-item ">
                <NavLink to="/addevent" className="nav-link">{"Dodaj zadanie"}</NavLink>
                </li>
                <li id="manageLink" className="nav-item dropdown">
                <NavLink to="/managers"  className="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {"Zarządzanie"}
                 </NavLink>
                 <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <NavLink to="/a" className="dropdown-item" >{"Action"}</NavLink>
              <NavLink to="/aa" className="dropdown-item" >{"Action"}</NavLink>
              <NavLink to="/aaa" className="dropdown-item" >{"Action"}</NavLink>
            </div>
                </li>
                <li  id="profileLink" className="nav-item ">
                <NavLink to="/settings"  className="nav-link">{"Ustawienia"}</NavLink>
                </li>
                <li id="logoutLink" className="nav-item ">
                <NavLink to="/logout"  className="nav-link">{"Wyloguj"}</NavLink>
                  </li>
              </ul>
              </div>
            </nav>                
      )
    }
    

    export default MainNavigation