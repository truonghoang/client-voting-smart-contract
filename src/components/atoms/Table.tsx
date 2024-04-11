import * as React from "react";

interface Column {
  id: any;
  label: string;
  minWidth?: number;
  align?: Align;
  format?: (value: number) => string | React.ReactElement;
  render?: (value: any) => React.ReactElement;
}
enum Align {
  center = "center",
  left = "left",
  right = "right",
}

interface Row {
  [key: string]: any;
}

export default function Table({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Row[];
}) {
  return (
    <div className="flex flex-col m-10">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th
                      scope="col"
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      className="px-6 py-3  text-xs font-medium text-gray-500 uppercase"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  return (
                    <tr
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800"
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <td
                            key={column.id}
                            align={column.align || "center"}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : column.render
                              ? column.render(row)
                              : value}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
