"use client";
import React from "react";
import Table from "@/components/atoms/Table";
import "@/styles/table.css";
import Modal from "@/components/atoms/Modal";
import StarRate from "@/components/atoms/StarRate";
function TableModule() {
  const [show, setShow] = React.useState(true);
  const [rate, setRate] = React.useState(0);
  const columns = [
    {
      id: "id",
      label: "Id",
      minWidth: 50,

      format: (value: number) => <span>{value.toLocaleString("en-US")}</span>,
    },
    {
      id: "productName",
      align: "center",
      label: "Product Name",
      minWidth: 100,
    },
    {
      id: "actionButton",
      label: "Action ",
      minWidth: 100,
      align: "center",
      format: (value: number) => value.toFixed(2),
      render: () => {
        return (
          <button
            type="button"
            onClick={() => setShow(true)}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Vote
          </button>
        );
      },
    },
  ];
  console.log(rate);
  const rows = [
    { id: 1, productName: "abc" },
    { id: 2, productName: "abc" },
  ];
  return (
    <div className="w-ful h-full  relative justify-center items-center ">
      <Modal
        children={<StarRate voteRate={(rate) => setRate(rate)} />}
        onShow={(open) => setShow(open)}
        show={show}
      />
      <Table columns={columns} rows={rows} />
    </div>
  );
}

export default TableModule;
