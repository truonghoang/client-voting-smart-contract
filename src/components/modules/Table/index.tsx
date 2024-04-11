"use client";
import React from "react";
import Table from "@/components/atoms/Table";
import "@/styles/table.css";
import Modal from "@/components/atoms/Modal";
import StarRate from "@/components/atoms/StarRate";
import api from "@/api"
import {formatDateTime} from "@/utils/formatTime"

import {useRouter} from "next/navigation"
import Button from "@/components/atoms/Button";
import {Textarea } from "@chakra-ui/react"
import Link from "next/link";
function TableModule() {
  const [show, setShow] = React.useState(false);
  const [rate, setRate] = React.useState(0);
  const [formShow,setFormShow] = React.useState(false);
  const [dataTable,setDataTable] = React.useState([]);
  const [dataFeedBack,setDataFeedBack] = React.useState<{productId:number,rating:number,reviewText:string}>({productId:0,rating:0,reviewText:"none"});
  const router = useRouter()
  const columns = [
    {
      id: "id",
      label: "Id",
      minWidth: 50,

      format: (value: number) => <span>{value.toLocaleString("en-US")}</span>,
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
      label: "link",
      minWidth: 100,
    },
    {
      id: "actionButton",
      label: "Action ",
      minWidth: 100,
      align: "center",
      format: (value: number) => value.toFixed(2),
      render: (record:any) => {
        return (
          <button
            type="button"
            onClick={() => {setShow(true); setDataFeedBack({...dataFeedBack,productId:record.id})}}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            feed back
          </button>
        );
      },
    },
  ];
 
  let children =<div className="flex flex-col h-[400px] justify-around items-center ">
    <StarRate voteRate={(rate)=>{setDataFeedBack({...dataFeedBack,rating:rate})}}/>
    <Textarea
        
        onChange={(e)=>{setDataFeedBack({...dataFeedBack,reviewText:e.target.value})}}
        placeholder='Here is a sample placeholder'
        size='sm'
    />
  </div>

   React.useEffect(()=>{
     api.getProducts(1,10).then(result =>{
      setDataTable(result)
     })
    
   },[])

   const onSave =()=>{
    api.feedback(dataFeedBack)
   }
  return (
    <div className="w-ful h-full  relative justify-center items-center ">
      <Link href={"/user"}>Go to user page</Link>
      <Button nameButton="add new" onClick={()=>{ router.push("/add")}}/>
      <Modal
        children={children}
        onShow={(open) => setShow(open)}
        show={show}
        onSave={onSave}
      />
      <Table columns={columns} rows={dataTable} />
    </div>
  );
}

export default TableModule;
