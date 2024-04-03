import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/Sidebar";
import TableModule from "@/components/modules/Table";


declare global {
  interface Window {
    ethereum?: any;
  }
}
export default async function Home() {
  return (
    <main className="flex w-full ">
      <SideBar />
      <div className="flex flex-col w-full ">
        <Header />
        <TableModule />
      </div>
    </main>
  );
}
