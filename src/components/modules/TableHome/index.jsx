import React from 'react'
import TableComponent from '@/components/table'
import {Button} from "@mui/material"
import FormAdd from "@/components/modules/FormAdd"
import "@/styles/Table.scss"
function TableHome() {
  
  const columns = [
    {
      id: "id",
      label: "Id",
      minWidth: 50,

      format: (value) => <span>{value.toLocaleString("en-US")}</span>,
    },
    {
      id: "name",
      align: "center",
      label: "Product Name",
      minWidth: 100,
    },
    {
      id: "image",
      align: "center",
      label: "Link",
      minWidth: 100,
    },
    {
      id: "actionButton",
      label: "Action ",
      minWidth: 100,
      align: "center",
      format: (value) => value.toFixed(2),
      render: (record) => {
        return (
          <Button
            variant='contained'
            onClick={() => {}}
           
          >
            feed back
          </Button>
        );
      },
    },
  ];
  const rows = [{ id:1,name:"sp1",image:'link1'}]
    return (
    <div className='container-table'>
     <FormAdd />
    <TableComponent columns={columns} rows ={rows}/>
    </div>
  )
}

export default TableHome