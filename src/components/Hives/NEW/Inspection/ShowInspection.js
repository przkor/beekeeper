
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PopUp from '../../../Modal/Modal'
import PopUpAddTask from '../../../Modal/ModalAddTask'
import FormAddInspection from './FormAddInspection'
import Button from 'react-bootstrap/Button'
//import Table from 'react-bootstrap/Table'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'; 

const Inspection = ({hiveID,apiary,callback}) => 
{
  const [inspections,setInspections] = useState([])
  const [showAddInspection,setShowAddInspection] = useState(false)

  const [popUp,setPopUp] = useState({
    status:false,
    title:'',
    message:'',
    type:''
  })

  const [popUpAddTask,setPopUpAddTask] = useState({
    status:false,
    title:'Nowe zadanie',
    message:'',
    type:'',
    hiveID,
    apiary
  })

  const getInspection = (hiveID) => {
    axios
    .get("/inspection", {
      params:{hiveID}
    })
    .then(function (response) {
        if (response.data==="access denied")
        {
            window.location.assign('/');
            return
        }
        setInspections(response.data)
    })
    .catch(function (error) {
       console.log(error);
    });
}

/*
const elements = 
  inspections.map((inspection,index)=>{
    return(
      <tr key={index}>
        <td>{inspection.ins_data}</td>
        <td>{inspection.ins_type1}</td>
        <td>{inspection.ins_type2}</td>
        <td>{inspection.description}</td>
      </tr>
    )
})
*/

const columns = [{
  dataField: '_id',
  text: 'ID',
  hidden:true
  // Perform a reverse sorting here
  
},{
  dataField: 'ins_data',
  text: 'Data',
  sort: true
  // Perform a reverse sorting here
  
}, {
  dataField: 'ins_type1',
  text: 'Czynność',
  sort: true
}, {
  dataField: 'ins_type2',
  text: 'Szczegóły',
}];

const expandRow = {
  renderer: row => (
    <div><p>{row.description}</p></div>
  )
};

const defaultSorted = [{
  dataField: 'ins_data',
  order: 'desc'
}];

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Show { from } to { to } of { size }
  </span>
);

const options = {
  paginationSize: 3,
  pageStartIndex: 1,
  // alwaysShowAllBtns: true, // Always show next and previous button
  withFirstAndLast: false, // Hide the going to First and Last page button
  // hideSizePerPage: true, // Hide the sizePerPage dropdown always
  hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
  prePageText: 'Back',
  nextPageText: 'Next',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    text: 'All', value: inspections.length
  }] // A numeric array is also available. the purpose of above example is custom the text
};

const rowStyle = { backgroundColor: '#c8e6c9' };

const showInspection = (
  <div className="mt-3">
    <h6>Historia Inspekcji</h6>
    <BootstrapTable  condensed bordered={ false }  hover
    keyField='_id' data={ inspections } columns={ columns } expandRow={ expandRow }
    defaultSorted={ defaultSorted } 
    pagination={ paginationFactory(options) }
    rowStyle={ rowStyle } 
    />
  </div>
  )
 
  const handleCancel = () => {
    callback()
  }

  const handleButtonAddTask = () => {
    setPopUpAddTask(prev => {
      return {
        ...prev,
        status:true
      }
    })
  }

  const handleAddInspection = () => {setShowAddInspection(true)} 

  useEffect(()=>{
    getInspection(hiveID)
  },[hiveID])

  return (
    <>
      <div className="form-area">
        <Button onClick={handleCancel} className="m-2">Zamknij</Button>
        {showAddInspection ? null : <Button onClick={handleAddInspection} className="m-2">Dodaj inspekcje</Button> }
        <Button onClick={handleButtonAddTask} className="m-2">Dodaj zadanie</Button>
        {showAddInspection ? <FormAddInspection hiveID={hiveID} handleShowPopUp={setPopUp} callback={setShowAddInspection} 
        handleSetInspections={setInspections}/> : null}
        {inspections.length>0 ? showInspection : null}
      </div>
      {
        popUp.status 
        ? 
        <PopUp parameters={popUp}
        callback={setPopUp}/> 
        : 
        null
      }
      {
        popUpAddTask.status 
        ?
        <PopUpAddTask parameters={popUpAddTask} callback={setPopUpAddTask}/>
        :
        null
      }
    </>
  )
  }


  export default Inspection
