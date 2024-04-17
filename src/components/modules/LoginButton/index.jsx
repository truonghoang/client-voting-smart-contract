import React from 'react'
import {Button} from '@mui/material'
import {useAuth} from "@/hooks/useAuth"
import api from "@/apis"
import SweetAlert from "sweetalert2"
function LoginButton() {
   
    const {login} = useAuth()
    const connectToMetaMask = async () => {
        try {
          let address = await api.getAddress();
          if (address) {
           login(address[0])
            SweetAlert.fire({
              title: "Login successfully",
              icon: "success",
            });
          
          }
        } catch (error) {
          SweetAlert.fire({
            title: error.message,
            icon: "error",
          });
        }
      };
  return (
    <Button variant='contained' onClick={connectToMetaMask}>Login MetaMask</Button>
  )
}

export default LoginButton