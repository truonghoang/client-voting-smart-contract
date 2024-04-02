"use client";
import React from "react";
import Button from "@/components/atoms/Button";
import Web3 from "web3";
import Cookie from "js-cookie";
import { useRouter  } from "next/navigation";
import SweetAlert from "sweetalert2"
import { MetaMaskInpageProvider } from "@metamask/providers";
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    web3?: any;
  }
}

function LoginForm() {
  const router = useRouter();
  React.useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else {
      console.error("MetaMask is not installed!");
    }

  }, []);

  const connectToMetaMask = async () => {
    try {
      // Yêu cầu quyền truy cập tài khoản
      await window.ethereum?.request({ method: "eth_requestAccounts" });
      const account: string[] | undefined  = await window.ethereum?.request({
        method: "eth_accounts",
      });
      console.log(account);
      if (account !== undefined && account.length > 0) {
        Cookie.set("ethereum_add", account[0],{expires: 3600});
        SweetAlert.fire({
          title:'Login successfully',
          icon: 'success'
        })
        router.push("/");
      }
      console.log("MetaMask is connected!");

      // Sau khi kết nối thành công, bạn có thể thực hiện các hành động khác tại đây
      // Ví dụ: lấy thông tin tài khoản, số dư, ...
    } catch (error) {
      console.error(
        "User denied account access or MetaMask is not installed",
        error
      );
    }
  };
  const style = {
    width: "200px",
    height: "50px", 
   
  };
  return (
    <div className=" w-6/12 h-3/6 translate-y-2/4 translate-x-1/2" >
      {/* <h3 className="m-3 font-semibold  font-[Arial,_Helvetica,_sans-serif]  text-[21px] text-[#fff] ">
        Login to join voting activity
      </h3> */}
      <Button
        onClick={connectToMetaMask}
        nameButton="Connect Wallet"
        style={style}
      />
    </div>
  );
}

export default LoginForm;
