import Table from "@/components/atoms/Table";
import '@/styles/table.css';
function TableModule() {
  const columns = [
    {
      id: "id",
      label: "Id",
      minWidth: 50,
     
      format: (value: number) => <span>{value.toLocaleString("en-US")}</span>,
    },
    { id: "productName", align:'center', label: "Product Name", minWidth: 100 },
    {
      id: "images",
      label: "Images",
      minWidth: 100,
      align: "center",
      render: (values: string[]) => (
        <>
          {Object.values(values).map((value) => (
            <img src={value} alt="" />
          ))}
        </>
      ),
    },
    {
      id: "actionButton",
      label: "Action Buttons",
      minWidth: 100,
      align: "center",
      format: (value: number) => value.toFixed(2),
      render: () => {
        return <div className="w-8 h-8"><button >button</button></div>;
      },
    },
  ];
  const rows = [{ id:1,productName: "abc", images: "./images/" },{ id:2,productName: "abc", images: "./images/" }];
  return (
    <div className="w-ful h-full  relative justify-center items-center ">
      <Table columns={columns} rows={rows} />
    </div>
  );
}

export default TableModule;
