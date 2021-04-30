import React, {useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { ContextLogin } from '../components/ContextLogin'
import NotLoggedComponent from  '../components/NotLoggedComponent'

const menuList = ["pasieki","ule","matki","akcje"]
const ManagerMenu = (props) => {
    const {isUserLogged} = useContext(ContextLogin)  
    const history = useHistory()
    const list = menuList.map(option =>(
        <li key={option} className="list-group-item">
            <Link to={`/manager/${option}`}>{option}</Link>
        </li>
    ))
    const nav= () => (
        <nav>
        <ul className="list-group">
            {list}
        </ul>
        </nav>

    )
    return ( 
        <div className="managerMenu">
            {
                isUserLogged 
                ?
                nav()
                :
                <NotLoggedComponent history={history}/>
            }   
        </div>
     );
}
 
export default ManagerMenu;