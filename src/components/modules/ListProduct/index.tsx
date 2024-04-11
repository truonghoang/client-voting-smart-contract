"use client";

import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,Button
} from "@chakra-ui/react";
import api from "@/api";
function ListProduct() {
  const titleTable = ["Id", "Rate", "Action"];
  const [rows, setRow] = React.useState([]);
  React.useEffect(() => {
    api.getProductsOwner().then((owner) => {
      setRow(owner);
    });
  }, []);
  const columns = [
    {
      id: "id",
      label: "Id",
      minWidth: 50,
      format: (value: number) => <span>{value.toLocaleString("en-US")}</span>,
    },
    {
      id: "rate",
      align: "center",
      label: "Rate",
      minWidth: 100,
    },

    {
      id: "actionButton",
      label: "detail vote ",
      minWidth: 100,
      align: "center",
      format: (value: number) => value.toFixed(2),
      render: () => {
        return (
          <Button
            type="button"
            onClick={() => {}}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Detail
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>List product feedback vote</TableCaption>
          <Thead>
            <Tr>
              {titleTable.map((item, index) => {
                return <Th align="center" key={index}>{item}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row:any) => {
              return (
                <Tr
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <Td
                        key={column.id}
                        align="center"
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : column.render
                          ? column.render(row)
                          : value}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListProduct;
