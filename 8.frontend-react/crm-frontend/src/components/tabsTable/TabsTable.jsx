
import React from 'react';
import './tabsTable.scss'
import Table from '../table/Table';

const TabsTable = (props) => {


  return (
      <div>
            <div className='table-tabs'>
                <button onClick={(e)=>{props.submit(e.target.innerText)}}>all</button>
                <button onClick={(e)=>{props.submit(e.target.innerText)}}>open</button>
                <button onClick={(e)=>{props.submit(e.target.innerText)}}>in progress</button>
                <button onClick={(e)=>{props.submit(e.target.innerText)}}>done</button>
                <button onClick={(e)=>{props.submit(e.target.innerText)}}>closed</button>
                <button onClick={(e)=>{props.submit(e.target.innerText)}}>canceled</button>
            </div>
        <Table clickRow={props.clickRow} columns={props.columns} data={props.data}/>
      </div>
  );
}

export default TabsTable