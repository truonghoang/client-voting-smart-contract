"use client";
import React from "react";
import Button from "@/components/atoms/Button";
import {ethers,Contract} from 'ethers';
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import SweetAlert from "sweetalert2";



function LoginForm() {
  const router = useRouter();
  
  let signer ;
  let provider:any;
  React.useEffect(() => {
    // console.error("MetaMask is not installed!",window.ethereum);
  if(!window.ethereum) return;
   provider = new ethers.BrowserProvider(window.ethereum)
  }, []);

  const connectToMetaMask = async () => {
    try {
      signer = await provider.getSigner()
       if(signer) {
        let address = await signer.getAddress()
        Cookie.set("ethereum_add", address, { expires: 3600 });
        SweetAlert.fire({
          title: "Login successfully",
          icon: "success",
        });
        router.push("/");
       }
    } catch (error) {
      SweetAlert.fire({
            title: "User denied account access or MetaMask is not installed",
            icon: "error",
          });
    }
  };
  const style = {
    width: "200px",
    height: "50px",
  };
  return (
    <div className=" w-6/12 h-3/6 translate-y-2/4 translate-x-1/2">
      <Button
        onClick={connectToMetaMask}
        nameButton="Connect Wallet"
        style={style}
      />
    </div>
  );
}

export default LoginForm;
