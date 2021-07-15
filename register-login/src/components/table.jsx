import React, {useTable} from "react-table";

import '../style/table.css'
import '../style/table_treatment.css'
export default function Table({ columns, data, tableID , onClick}) {
    // Table component logic and UI come here
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
      } = useTable({
        columns,
        data
      });

      return (
        <div className="table_container">
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
              console.log(row.original.client_id);
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
        </div>
      );
    }