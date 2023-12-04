import React, { useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      autoResetGlobalFilter: false,
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined || "";
    setGlobalFilter(value || undefined || "");
    setFilterInput(value);
  };

  return (
    <div className="pb-2">
      <div className="row mb-1">
        <div className="col-sm-12 col-md-5 col-lg-4 col-xl-2">
          <input
            className="form-control"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Search..."}
          />
        </div>
        <div className="col mb-3"></div>
        <div className="col-sm-12 col-md-5 col-lg-4 col-xl-2 text-end cursor">
          <select
            className="form-control form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="table-responsive pt-4">
        <table className="table text-center table-striped" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, indexj) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    key={indexj}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="text-sm font-weight-bold mb-0"
                  key={i}
                >
                  {row.cells.map((cell, j) => (
                    <td {...cell.getCellProps()} key={j}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination pt-2">
        <div className="btn-group">
          <button
            className="btn btn-white btn-sm"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {<i className="fas fa-angle-double-left"></i>}
          </button>{" "}
          <button
            className="btn btn-white btn-sm"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {<i className="fas fa-angle-left"></i>}
          </button>
          <button
            className="btn btn-white btn-sm"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {<i className="fas fa-angle-right"></i>}
          </button>
          <button
            className="btn btn-white btn-sm"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {<i className="fas fa-angle-double-right"></i>}
          </button>
        </div>
        &nbsp;
        <span className="my-auto">
          Page
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
      </div>
    </div>
  );
}

export default Table;
