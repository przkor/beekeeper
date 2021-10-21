import React, {useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { ContextLogin } from '../components/ContextLogin'
import NotLoggedComponent from  '../components/NotLoggedComponent'

const menuList = ["pasieki","ule","matki","akcje"]
const ManagerMenu = (props) => {
    const {isUserLogged} = useContext(ContextLogin)  
    const history = useHistory()
    const list = menuList.map((option,index) =>(
        
            <Link to={`/manager/${option}`} className="tags" key={index}>
                <button type="button" className="list-group-item list-group-item-action">{option}</button>
            </Link>
        
    ))
    const nav= () => (
        <div className="list-group w-50 m-auto" >
            {list}
        </div>
        /*
        <nav>
        <ul className="list-group">
            {list}
        </ul>
        </nav>
        */
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