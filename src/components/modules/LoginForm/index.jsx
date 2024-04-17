import React from "react";
import "@/styles/Login.scss";
import {useAuth} from "@/hooks/useAuth"
import api from "@/apis"
import SweetAlert from "sweetalert2"
import { Checkbox, Link,Divider, Button } from "@mui/material";
function LoginForm() {
    const  [account,setAccount] = React.useState({account:'',password:''})
    let timeout;
   const onChange = (e)=>{
     clearTimeout(timeout);
     timeout = setTimeout(()=>{
           setAccount({...account,[e.target.name]:e.target.value})
     },500)
   }
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
    <div className="wrap-form-login">
      <div className="block-1">
      <p className="title-login">To keep connected with us please login with personal information</p>
         <input className='input-common' name='account' placeholder='User Name' onChange={onChange}/>
         <input className='input-common' name='password' placeholder='Password' onChange={onChange} />
         <div className='wrap-block'>
         <Link href='#'>Sign Up ?</Link>
            <Link href='#'>Forgot password</Link>
         </div>
         <button className="btn-summit" onClick={connectToMetaMask}>Login to your Account</button>
      </div>
      
      <div className="block-2">
        
      </div>
    </div>
  );
}

export default LoginForm;
