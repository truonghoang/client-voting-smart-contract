
import ListProduct from "@/components/modules/ListProduct"
import Link from "next/link"
import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/Sidebar";

function User() {
  return (
    <div className="flex w-full ">
        <SideBar />
      <div className="flex flex-col w-full ">
        <Header />
        <Link href={"/"}>Back to home</Link>
        <ListProduct/>
      </div>
       
    </div>
  )
}

export default User