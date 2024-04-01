import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/Sidebar";
import TableModule from "@/components/modules/Table";
export default function Home() {
  return (
    <main className="flex w-full ">
      
       <SideBar/>
       <div className="flex flex-col w-full ">
       <Header/>
        <TableModule/>
       </div>
    </main>
  );
}
