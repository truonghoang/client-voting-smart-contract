import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import '@/styles/Table.scss'
function TableComponent({ columns, rows }) {
  return (
    <TableContainer component={Paper}  >
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead>
          <TableRow>
            {columns.map((item, index) => {
              return (
                <TableCell
                  align={item.align ? item.align : "center"}
                  key={index}
                >
                  {item.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={row.align ? row.align : "center"}
                    >
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : column.render
                        ? column.render(row)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
