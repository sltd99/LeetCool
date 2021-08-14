import { useTable, useFilters } from "react-table"
import React from "react"
import { useRouter } from "next/dist/client/router"

export default function Table() {
  const data = React.useMemo(
    () => [
      {
        title: "1. Two Sum",
        title_slug: "two-sum",
        difficulty: "Easy",
        tags: "Array",
        solutions: [
          {
            name: "Alex",
          },
          {
            name: "Longlong",
          },
        ],
        lastSubmitted: "1/1/2021",
      },

      {
        title: "2. Add Two Numbers",
        title_slug: "add-two-numbers",
        difficulty: "Medium",
        tags: "Array, Array, Array, Array, Array, Array",
        solutions: [
          {
            name: "Alex",
          },
        ],
        lastSubmitted: "1/2/2021",
      },
    ],

    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title", // accessor is the "key" in the data
      },
      {
        Header: "Difficulty",
        accessor: "difficulty",
      },
      {
        Header: "Tags",
        accessor: "tags",
      },
      {
        Header: "Solutions",
        accessor: "solutions",
        Cell: ({ value }) => (
          <div className="flex space-x-3">
            {value.map(user => (
              <span
                key={user.name}
                className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500"
              >
                <span className="text-xs font-medium leading-none text-white">{user.name[0]}</span>
              </span>
            ))}
          </div>
        ),
      },
      {
        Header: "Last Submitted",
        accessor: "lastSubmitted",
      },
    ],

    []
  )

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
  )

  const router = useRouter()

  return (
    <div className="mx-3 my-3">
      <div className="flex mb-3 space-x-1 ">
        <input
          type="text"
          placeholder="search"
          onChange={e => setFilter("title", e.target.value)}
          className="form-input rounded"
        />

        <select className="form-select rounded">
          <option value="">Tags</option>
        </select>

        <select className="form-select rounded">
          <option value="">Authors</option>
        </select>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
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

          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map(row => {
              prepareRow(row)

              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => router.push("/solutions/" + row.original.title_slug)}
                  className="hover:bg-gray-50"
                >
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
