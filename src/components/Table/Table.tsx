import React, { useEffect } from "react";
import {
    SortingRule,
    useFilters,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import DefaultColumnFilter from "./Filters/DefaultColumnFilter";

import TableDesktop from "./TableDesktop/TableDesktop";
import TableMobile from "./TableMobile/TableMobile";
import { DefaultCell } from "../TableCells/TableCells";
import Pagination from "../UI/Pagination/Pagination";

interface IPropsTable {
  columns: any[]
  data: any[]
  noDataText: string
  buttonsCell?: string[]
  type?: string
  handlePagination: (offset: number) => void
  pagesCount: number
  showWinner?: boolean
  onSort?: (sortBy: SortingRule<object>[]) => void
}

const Table: React.FC<IPropsTable> = (props) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      Cell: DefaultCell,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    state: { sortBy }
  } = useTable(
    {
      columns: props.columns,
      data: props.data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  useEffect(() => {
    if (props.data.length) setPageSize(props.data.length)
  }, [props.data.length])

    useEffect(() => {
        props.onSort && props.onSort(sortBy);
    }, [props.onSort, sortBy]);

  return (
    <React.Fragment>
      <TableDesktop
        type={props.type}
        getTableProps={getTableProps}
        columns={props.columns}
        data={props.data}
        page={page}
        noDataText={props.noDataText}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        prepareRow={prepareRow}
        showWinner={props.showWinner}
      />
      <TableMobile
        buttonsCell={props.buttonsCell}
        getTableProps={getTableProps}
        columns={props.columns}
        data={props.data}
        page={page}
        noDataText={props.noDataText}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        prepareRow={prepareRow}
      />

      {props.pagesCount > 1 &&
        <Pagination handlePagination={props.handlePagination} pagesCount={props.pagesCount}/>
      }
    </React.Fragment>
  );
};

export default Table;
