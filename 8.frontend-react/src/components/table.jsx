import React, {useTable,usePagination} from "react-table";

import '../style/table.css'
import '../style/table_treatment.css'
export default function Table({ columns, data, tableID , onClick, class_name}) {
    // Table component logic and UI come here
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        pageOptions,
   page,
  state: { pageIndex, pageSize },
  gotoPage,
   previousPage,
   nextPage,
   setPageSize,
   canPreviousPage,
   canNextPage,
      } = useTable({
        columns,
        data,
        usePagination
      });

      return (
        <div className={class_name}>
        <table id= {tableID} {...getTableProps()}>
          <thead>
            
            {headerGroups.map(headerGroup => (
              <tr  {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              //console.log(row.original.client_id);
              const client_id = row.original.client_id
              prepareRow(row);
              return (
                
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                  if (cell.column.Header==="Full name" || cell.column.Header==="Phone" || cell.column.Header==="Email" ) {
                    return <td onClick={(e)=>onClick(e,row)}  {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  }else{
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
            {/* <div>
       <button onClick={() => previousPage()} disabled={!canPreviousPage}>
         Previous Page
      </button>
       <button onClick={() => nextPage()} disabled={!canNextPage}>
         Next Page
       </button>
      <div>
         Page{' '}
        <em>
           {pageIndex + 1} of {pageOptions.length}
         </em>
       </div>
       <div>Go to page:</div>
       <input
         type="number"
         defaultValue={pageIndex + 1 || 1}
         onChange={e => {
           const page = e.target.value ? Number(e.target.value) - 1 : 0
          gotoPage(page)
         }}
       />
      <select
        value={pageSize}
         onChange={e => {
           setPageSize(Number(e.target.value))
         }}
       >
         {pageSizeOptions.map(pageSize => (
           <option key={pageSize} value={pageSize}>
             Show {pageSize}
           </option>
         ))}
       </select>
     </div> */}
        </div>
      );
    }