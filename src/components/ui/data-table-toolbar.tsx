import { Table } from "@tanstack/react-table";

import { Button } from "./button";
import { DataTableViewOptions } from "./data-table-view-options";
import { CrossIcon } from "lucide-react";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { statuses } from "./data/data";
import { useGetShopsQuery } from "@/features/shops/shopApiSlice";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { data: shops } = useGetShopsQuery();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {/* {table.getColumn("sex") && (
          <DataTableFacetedFilter
            column={table.getColumn("sex")}
            title="Gender"
            options={sex}
          />
        )} */}
        {/* {table.getColumn("year") && (
          <DataTableFacetedFilter
            column={table.getColumn("year")}
            title="Year"
            options={years}
          />
        )} */}
        {/* {table.getColumn("month") && (
          <DataTableFacetedFilter
            column={table.getColumn("month")}
            title="Month"
            options={months}
          />
        )} */}
        {shops && table.getColumn("shop") && (
          <DataTableFacetedFilter
            column={table.getColumn("shop")}
            title="Shop"
            options={shops.map((shop) => ({
              label: shop.name,
              value: shop.name,
            }))}
          />
        )}
        {/* {table.getColumn("operation") && (
          <DataTableFacetedFilter
            column={table.getColumn("operation")}
            title="Operation"
            options={operations}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CrossIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="ml-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
