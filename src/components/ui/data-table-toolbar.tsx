import { Table } from "@tanstack/react-table";

import {
  statuses,
  operations,
  sex,
  accountType,
  years,
  months,
} from "./data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Button } from "./button";
import { DataTableViewOptions } from "./data-table-view-options";
import { CrossIcon } from "lucide-react";
import { useGetBranchesByDistrictQuery } from "@/features/branches/branchApiSlice";
import { useParams } from "react-router-dom";
import { getBranchesType } from "./data/getBranchesType";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;


  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )} */}
        {/* {table.getColumn("sex") && (
          <DataTableFacetedFilter
            column={table.getColumn("sex")}
            title="Gender"
            options={sex}
          />
        )} */}
        {/* {table.getColumn("accountType") && (
          <DataTableFacetedFilter
            column={table.getColumn("accountType")}
            title="Account Type"
            options={accountType}
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
        {/* {branchesType && table.getColumn("branch") && (
          <DataTableFacetedFilter
            column={table.getColumn("branch")}
            title="Branch"
            options={branchesType}
          />
        )} */}
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
