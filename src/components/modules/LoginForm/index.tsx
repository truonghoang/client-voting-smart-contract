"use client";
import React from "react";
import Button from "@/components/atoms/Button";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import SweetAlert from "sweetalert2";

import api from "@/api";

function LoginForm() {
  const router = useRouter();

  const connectToMetaMask = async () => {
    try {
      let address = await api.getAddress();
      if (address) {
        Cookie.set("ethereum_add",address, { expires: 3600 });
        SweetAlert.fire({
          title: "Login successfully",
          icon: "success",
        });
        router.push("/");
      }
    } catch (error: any) {
      SweetAlert.fire({
        title: error.message,
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
