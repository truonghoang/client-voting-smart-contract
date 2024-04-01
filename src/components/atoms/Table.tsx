import * as React from "react";


interface Column {
  id:any;
  label: string;
  minWidth?: number;
  align?: Align ;
  format?: (value: number) => string | React.ReactElement;
  render?: (value:any) => React.ReactElement;
}
 enum Align {
 center ='center',
 left= 'left',
 right= 'right'
 }

interface Row  {[key:string]:any}  ;

export default function Table({ columns,rows}:{columns:Column[],rows:Row[]}) {
 
  return (
        <div className="rounded-tl-[10px] rounded-tr-[15px] bg-gray-300 w-11/12 m-10 translate-x-[2%]">
            <table className="table-auto"   >
          <thead  >
            <tr >
              {columns.map((column) => (
                <th
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth}}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows
              .map((row) => {
                return (
                  <tr  role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <td key={column.id} align={column.align|| 'center'}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : column.render 
                            ? column.render(value)
                            : value}
                        </td>
                      );
                    })}

                  </tr>
                );
              })}
            
          </tbody>
        </table>
        </div>
      
  );
}