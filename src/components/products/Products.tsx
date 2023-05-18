import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import useFetchData from "../../hooks/useFetchData";
import { GlobalFilter } from "./../GlobalFilter";
import { SingleProductDetails } from "./SingleProductDetails";

export const Products = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [productIdOfCurrentlySelectedRow, setProductIdOfCurrentlySelectedRow] = useState<number | null>(null);

  // fetch the data
  const { fetchedData, loading, error, refetchData } = useFetchData<ProductData[]>("/product/");

  useEffect(() => {
    if (fetchedData) {
      // Reverse the array so the last entered item will be at the top of the table
      setData(fetchedData.reverse());
    }
  }, [fetchedData]);

  // Once the data is fetched, set the default row to the recrord at top of the table
  if (productIdOfCurrentlySelectedRow === null && data.length > 0) {
    if (data[0].product_id) {
      setProductIdOfCurrentlySelectedRow(data[0].product_id);
    }
  }

  // define column configuration object.
  const columns: Column<ProductData>[] = React.useMemo(
    () => [
      {
        Header: "Product name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Stock",
        accessor: "quantity_in_stock",
      },
      {
        Header: "sold by",
        accessor: "sold_by",
      },
      {
        Header: "Case size",
        accessor: "case_size",
      },
      {
        Header: "RRP",
        accessor: "rrp",
      },
      {
        Header: "Restock level",
        accessor: "restock_level",
      },
      {
        Header: "Product ID",
        accessor: "product_id",
      },
    ],
    []
  );

  // eslint-disable-next-line
  const handleClickOnRow = (event: any) => {
    const id = event.nativeEvent.target.parentNode.childNodes[7].innerText;

    setProductIdOfCurrentlySelectedRow(Number(id));
  };

  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  // Once we have an id of a selected record, find the record within the data array
  let detailsSelectedProduct = {} as ProductData;
  if (productIdOfCurrentlySelectedRow) {
    const SingleProductData = data?.find((row) => row.product_id === productIdOfCurrentlySelectedRow);
    if (SingleProductData) {
      detailsSelectedProduct = SingleProductData;
    }
  }

  return (
    <>
      <div className="heading">
        {" "}
        <span>Products</span>
      </div>
      <>
        <div className="table-wrapper">
          {loading && <div className="error-loading">Loading.....</div>}
          {error && <div className="error-loading">Error. {error?.message}</div>}
          {!loading && !error && (
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr className="table-heading" {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span className="sort-arrows">{column.isSorted ? column.isSortedDesc ? <FaSortUp /> : <FaSortDown /> : <FaSort />}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <motion.tr {...row.getRowProps()} onClick={handleClickOnRow} initial={{ y: 50 }} animate={{ y: 0 }}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                      })}
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        {detailsSelectedProduct && (
          <SingleProductDetails
            setProductIdOfCurrentlySelectedRow={setProductIdOfCurrentlySelectedRow}
            productDetails={detailsSelectedProduct}
            refetchData={refetchData}
            loading={loading}
          />
        )}
      </>
    </>
  );
};
