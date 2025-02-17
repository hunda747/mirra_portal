import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "./input";
import { DataTableToolbar } from "./data-table-toolbar";
import { CheckCheck, Download } from "lucide-react";
import { Button } from "./button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  clickable: boolean;
  onUrl: boolean;
  pageInfo?: any;
  type: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  clickable,
  type,
}: DataTableProps<TData, TValue>) {
  localStorage.setItem("clickable", clickable.toString());
  const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [settleLoading, setSettleLoading] = React.useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [loading] = React.useState(false);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // const hpcIds = table
  //   .getFilteredSelectedRowModel()
  //   .rows.map((row) => row.original.id);

  // const selectedAccountIds = table
  //   .getFilteredSelectedRowModel()
  //   .rows.map((row) => row.original.id);

  // const totalInitialDeposit = table
  //   .getFilteredSelectedRowModel()
  //   .rows.map(({ original }) => original)
  //   .reduce((sum, account) => sum + (account.initialDeposit || 0), 0);

  // const handleBulkSettle = async () => {
  //   setSettleLoading(true);
  //   const selectedAccountIds = table
  //     .getFilteredSelectedRowModel()
  //     .rows.map((row) => row.original.id);
  //   try {
  //     if (selectedAccountIds.length > 0) {
  //       const response = await bulkSettle(selectedAccountIds);
  //       if (response.data) {
  //         toast.success("Accounts settled successfully.");
  //       } else {
  //         toast.error("Failed to settle accounts.");
  //       }
  //     }
  //   } catch (error) {
  //     toast.error(error?.data.message);
  //   } finally {
  //     setSettleLoading(false);
  //   }
  // };

  return (
    <div>
      <div className="flex flex-row items-start gap-2 py-4">
        <Input
          placeholder="Search ..."
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm ml-2"
        />
        <div className="sm:flex w-full items-center justify-between">
          <div className="sm:ml-2 mb-2">
            <DataTableToolbar table={table} />
          </div>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex items-center justify-center">
                <Button
                  className="ml-2 border"
                  size="sm"
                  // onClick={() => {
                  //   type === "loan"
                  //     ? exportDataToExcel(
                  //         "filtered",
                  //         table.getFilteredSelectedRowModel().rows
                  //       )
                  //     : type === "account"
                  //     ? exportDataToExcel(
                  //         "filtered",
                  //         table.getFilteredSelectedRowModel().rows
                  //       )
                  //     : type === "offline" &&
                  //       exportDataToExcel(
                  //         "filtered",
                  //         table.getFilteredSelectedRowModel().rows
                  //       );
                  // }}
                  variant="secondary"
                  disabled={loading}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                {/* {clickable &&
                  !table
                    .getFilteredSelectedRowModel()
                    .rows.map((item) =>
                      item.original.status?.includes("INITIAL")
                    )[0] &&
                  !table
                    .getFilteredSelectedRowModel()
                    .rows.map((item) =>
                      item.original.status?.includes("PENDING")
                    )[0] &&
                  !table
                    .getFilteredSelectedRowModel()
                    .rows.map((item) =>
                      item.original.status?.includes("APPROVED")
                    )[0] &&
                  !table
                    .getFilteredSelectedRowModel()
                    .rows.map((item) =>
                      item.original.status?.includes("REJECTED")
                    )[0] &&
                  table
                    .getFilteredSelectedRowModel()
                    .rows.map((item) =>
                      item.original.status?.includes("UNSETTLED")
                    )[0] && (
                    <div>
                      <Button
                        className="ml-2 border"
                        size="sm"
                        disabled={settleLoading}
                        variant="secondary"
                        onClick={settleModal.onOpen}
                      >
                        <CheckCheck className="mr-2 h-4 w-4" />
                        {settleLoading ? "Settling..." : "Settle"}
                      </Button>
                    </div>
                  )} */}
              </div>
            </div>
          )}
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow
                key={row.id}
                className={`${clickable && "cursor-pointer"}`}
                onClick={() => navigate(row.original.id)}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
