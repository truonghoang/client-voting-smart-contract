"use client";
import React from "react";
import Button from "@/components/atoms/Button";
import api from "@/api"
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
function FormComponent() {

const router = useRouter()
const [data,setData] = React.useState({name:'',link:''})
const onChange =(e:any) =>{
    setData({...data,[e.target.name]:e.target.value})
}
const onClick =()=>{
  api.addProducts(data.name,data.link).then((receipt) =>{
          Swal.fire({text:"add success",icon:"success"})
          router.back()
  }).catch((error) =>{
    Swal.fire({text:"something wrong with transaction",icon:"error"})
     router.back()
  })
}

  return (
    <div>
      <div className="relative">
        <label
          htmlFor="input-label"
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          Name Product
        </label>
        <input
         name="name"
          id="input-label"
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="name product"
          onChange={onChange}
        ></input>
      </div>
      <div className="relative">
        <label
          htmlFor="input-label"
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          link image
        </label>
        <input
          name="link"
          onChange={onChange}
          id="input-label"
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="link image"
        ></input>
      </div>
      <Button nameButton="add" onClick={onClick}/>
   
    </div>
  );
}

export default FormComponent;
