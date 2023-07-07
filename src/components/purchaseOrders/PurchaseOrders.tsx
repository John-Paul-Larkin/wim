import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import useFetchData from "../../hooks/useFetchData";
import { GlobalFilter } from "./../GlobalFilter";
import OrderItems from "./OrderItems";
import "./PurchaseOrders.css";

export const PurchaseOrders = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);

  // fetch the productData
  const { fetchedData, loading, error } = useFetchData<ProductData[]>("/product/");

  useEffect(() => {
    if (fetchedData) {
      // Reverse the array so the last entered item will be at the top of the table
      setProductData(fetchedData.reverse());
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
        Header: "",
        accessor: "product_id",
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
        Header: "On hold",
        accessor: "quantity_on_hold",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: productData }, useGlobalFilter, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  const [selectedProducts, setSelectedProducts] = useState<ProductDataQuantity[] | null>(null);

  const handleAddToOrder = (id: number) => {
    //search by id, find the product and add an order quantity of 0
    const product: ProductDataQuantity = productData
      .filter((product) => product.product_id === id)
      .map((product) => {
        return { ...product, order_quantity: 0 };
      })[0];

    if (selectedProducts) setSelectedProducts([...selectedProducts, product]);
    else setSelectedProducts([product]);
  };

  const addAllItemsBelowRestockLevel = () => {
    // filter by bwloe restock, map to add 0 quantity, lastly filter to remove products already added
    const productsBelowRestockLevel = productData
      .filter((product) => product.quantity_in_stock < product.restock_level)
      .map((product) => {
        return { ...product, order_quantity: 0 };
      })
      .filter((product) => !selectedProducts?.find((prod) => prod.product_id === product.product_id));

    if (selectedProducts !== null) {
      setSelectedProducts([...selectedProducts, ...productsBelowRestockLevel]);
    } else {
      setSelectedProducts(productsBelowRestockLevel);
    }
  };

  return (
    <>
      <h1>
        {" "}
        <span>Purchase orders</span>
      </h1>
      <>
        <div className="table-wrapper product-table purchase-table">
          {loading && (
            <div className="error-loading">
              <span>Loading.....</span>
            </div>
          )}
          {error && (
            <div className="error-loading">
              <span>Error. {error?.message}</span>
            </div>
          )}
          {!loading && !error && (
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr className="table-heading" {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        {column.Header !== "" && (
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
                    <motion.tr {...row.getRowProps()} initial={{ y: 50 }} animate={{ y: 0 }}>
                      {row.cells.map((cell, index, cellArray) => {
                        // Hightlight if stock level is below restock level
                        // index represents the column
                        if (index === 2 && cellArray[3].value > cellArray[2].value) {
                          return (
                            <td {...cell.getCellProps()} className="below-restock">
                              <div>{cell.render("Cell")}</div>
                            </td>
                          );
                        } else if (index === 1) {
                          //adds an order button to each row
                          const isAlreadySelected = selectedProducts?.find((product) => product.product_id === cell.value);
                          return (
                            <td key={cell.value}>
                              <button disabled={isAlreadySelected ? true : false} onClick={() => handleAddToOrder(cell.value)}>
                                Order
                              </button>
                            </td>
                          );
                        } else {
                          return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        }
                      })}
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div>
          <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        <button onClick={addAllItemsBelowRestockLevel}>Add low stocked</button>
        </div>
      </>
      <OrderItems selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
    </>
  );
};
