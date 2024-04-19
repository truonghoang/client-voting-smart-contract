import React from 'react'
import TableComponent from '@/components/table'
import {Button} from "@mui/material"
import FormAdd from "@/components/modules/FormAdd"
import FeedBackForm from '../FeedBackForm'
import "@/styles/Table.scss"
import apis from '../../../apis'
import { ethers } from 'ethers'
function TableHome() {
  const [row,setRow] = React.useState([])
  const [feedback,setFeedBack] = React.useState(false)
  const [data,setData] = React.useState(0)
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
            onClick={() => {
              console.log(record.id)
              setData(record.id)
              setFeedBack(true)
             }}
           
          >
            feed back
          </Button>
        );
      },
    },
  ];

  
  React.useEffect(()=>{
     apis.getProducts(1,10).then(data=>{
      setRow(data)
     })
   
   const {contract} = apis.initContract()
   contract.on("ProductAdded",(arg1)=>{
    // console.log(arg1)
    const index =ethers.BigNumber.from(arg1._hex).toNumber()
    const page = Math.ceil(index/10)
    apis.getProducts(page,10).then(data=>{
      setRow(data)
     })

 })
 return ()=>{
   contract.removeAllListeners()
 }
    
  },[])
 
    return (
    <div className='container-table'>
     <FormAdd />
     {feedback ?<FeedBackForm id={data} open={feedback} onOpen={value=>{setFeedBack(value)}}/>:""}
    <TableComponent columns={columns} rows ={row}/>
    </div>
  )
}

export default TableHome