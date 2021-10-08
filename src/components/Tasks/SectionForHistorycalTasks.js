import React from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'; 

const SectionHistorycalTasks = ({tasks,apiary}) =>  {
  let tableTasks
  if (apiary==='noassignment') {tableTasks = tasks.filter(task=>(task.apiary==='' ))}
  else {tableTasks = tasks.filter(task=>((task.apiary===apiary || apiary==='all'))) }
 
  const columns = [{
    dataField: 'title',
    text: 'Zadanie',
    sort: false
  },
{
    dataField: 'date',
    text: 'Wykonać do',
    sort: true
  },
  {
    dataField: 'finishDate',
    text: 'Data zakończenia',
    sort: true
  }];
  
  const expandRow = {
    parentClassName: 'foo',
    showExpandColumn: true,
    renderer: row => (
      <div style={{backgroundColor:"#c8e6c9"}}><p >{row.subject}</p></div>
    ),
    
    
  };
  
  const defaultSorted = [{
    dataField: 'finishDate',
    order: 'desc'
  }];
  
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Show { from } to { to } of { size }
    </span>
  );
  
  const options = {
    paginationSize: 5,
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
      text: '10', value: 10
    }, {
      text: '20', value: 10
    }, {
      text: 'All', value: tasks.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };
  
  
  const showHistorycalTasks = (
    
      <BootstrapTable classes="foo"  condensed bordered={ false }  hover
      keyField='_id' data={ tableTasks } columns={ columns } expandRow={ expandRow }
      defaultSorted={ defaultSorted } 
      pagination={ paginationFactory(options) }
      headerWrapperClasses='foo'
      />
   
    )

  if (apiary==='noassignment') {tableTasks = tasks.filter(task=>(task.apiary==='' ))}
  else {tableTasks = tasks.filter(task=>((task.apiary===apiary || apiary==='all'))) }

  
  if (tableTasks.length===0) { return <b>brak wykonanych zadań</b>}
  else
  {
    return(
      showHistorycalTasks
      /*
        <table className="table table-sm table-striped table-bordered">
        <thead className="thead thead-dark">
          <tr>
          <th scope="col">#</th>
          <th scope="col">Zadanie / Nr ula</th>
          <th scope="col">Data zakończenia</th>
          </tr>
        </thead>
        <tbody>
          {
            tableTasks.map((task,index) =>
            {
              return(
                <>
                <tr className="table-warning" key={task._id}>
                <th scope="row">{index + 1}</th>
                  <td>{task.title}</td>
                  <td>{task.finishDate ? task.finishDate : 'brak'}</td>
                </tr>
                <tr className="table-secondary">
                 <td colSpan='5' style={{textAlign:'left'}}><b>Opis: </b> {task.subject}</td>
               </tr>
               </>
              )
            })
            }
        </tbody>
      </table>
      */
      )
  } 
    
  }

  export default SectionHistorycalTasks