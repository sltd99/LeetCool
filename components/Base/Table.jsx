import { useTable, useFilters } from "react-table";
import React from "react";
import { useRouter } from "next/dist/client/router";
import classNames from "classnames";

export default function Table({ data, columns, showSearch = true }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { filters },
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters
  );

  const router = useRouter();

  return (
    <div className="mx-3 my-3 rounded-md border-1">
      {showSearch && (
        <div className="flex mb-3 space-x-1 ">
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setFilter("title", e.target.value)}
            className="form-input rounded"
          />

          <select className="form-select rounded">
            <option value="">Tags</option>
          </select>

          <select className="form-select rounded">
            <option value="">Authors</option>
          </select>
        </div>
      )}

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            {...getTableBodyProps()}
            className="bg-white divide-y divide-gray-200"
          >
            {rows.map((row, index) => {
              prepareRow(row);

              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => {
                    if (row.original.questionId) {
                      router.push("/solutions/" + row.original.questionId);
                    } else if (row.original.user_email) {
                      router.push("/performance/" + row.original.user_id);
                    }
                  }}
                  className={classNames(
                    "hover:bg-gray-50 transform",
                    index === 0 &&
                      "border-2 border-r-4 border-l-4 border-indigo-500 mx-2"
                  )}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {cell.render("Cell")}
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
  );
}
