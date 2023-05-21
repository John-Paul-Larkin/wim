import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import useFetchData from "../../hooks/useFetchData";
import { GlobalFilter } from "./../GlobalFilter";
import "./Products.css";
import { SingleProductDetails } from "./SingleProductDetails";
export const Products = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [idOfCurrentlySelectedRow, setIdOfCurrentlySelectedRow] = useState<number | null>(null);

  // fetch the data
  const { fetchedData, loading, error, refetchData } = useFetchData<ProductData[]>("/product/");

  useEffect(() => {
    if (fetchedData) {
      // Reverse the array so the last entered item will be at the top of the table
      setData(fetchedData.reverse());
    }
  }, [fetchedData]);

  // define column configuration object.
  const columns: Column<ProductData>[] = React.useMemo(
    () => [
      {
        Header: "Product name",
        accessor: "name",
      },
      {
        Header: "Stock",
        accessor: "quantity_in_stock",
      },
      {
        Header: "Restock level",
        accessor: "restock_level",
      },
      {
        Header: "Sold by",
        accessor: "sold_by",
      },
      {
        Header: "Case size",
        accessor: "case_size",
      },
      {
        Header: "Unit RRP",
        accessor: "unit_rrp",
      },
      {
        Header: "ID",
        accessor: "product_id",
      },
      {
        Header: "Purchase Price",
        accessor: "purchase_price",
      },
      {
        Header: "Sale price",
        accessor: "sale_price",
      },
      {
        Header: "SKU",
        accessor: "sku",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  // Once the data is fetched, set the default row to the recrord at top of the table
  if (idOfCurrentlySelectedRow === null && data.length > 0) {
    if (data[0].product_id) {
      setIdOfCurrentlySelectedRow(data[0].product_id);
    }
  }

  //used below to distinguish the row within the table
  const columnContainingId = 6;
  // eslint-disable-next-line
  const handleClickOnRow = (event: any) => {
    const id = event.nativeEvent.target.parentNode.childNodes[columnContainingId].innerText;

    setIdOfCurrentlySelectedRow(Number(id));
  };

  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  // Once we have an id of a selected record, find the record within the data array
  let detailsSelectedProduct = {} as ProductData;
  if (idOfCurrentlySelectedRow) {
    const SingleProductData = data?.find((row) => row.product_id === idOfCurrentlySelectedRow);
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
        <div className="table-wrapper product-table">
          {loading && <div className="error-loading"><span>Loading.....</span></div>}
          {error && <div className="error-loading"><span>Error. {error?.message}</span></div>}
          {!loading && !error && (
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr className="table-heading" {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        {column.Header !== "Description" && column.Header !== "Eircode" && (
                          <span className="sort-arrows">{column.isSorted ? column.isSortedDesc ? <FaSortUp /> : <FaSortDown /> : <FaSort />}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <motion.tr
                      {...row.getRowProps()}
                      onClick={handleClickOnRow}
                      initial={{ y: 50 }}
                      animate={{ y: 0 }}
                      className={row.cells[columnContainingId].value === idOfCurrentlySelectedRow ? "row-selected" : ""}
                    >
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
            setIdOfCurrentlySelectedRow={setIdOfCurrentlySelectedRow}
            productDetails={detailsSelectedProduct}
            refetchData={refetchData}
            loading={loading}
          />
        )}
        <div className="test"></div>
      </>
    </>
  );
};
