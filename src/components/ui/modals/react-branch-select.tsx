import Select, { SingleValue } from "react-select";
import { Control } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "../form";
import { Branch } from "@/features/branches/branchApiSlice";

// Define the option type for react-select
type OptionType = {
  label: string;
  value: string;
};

// Custom hook to manage single-branch selection with search
export const useUpdateBranchSelect = (
  branches: Branch[],
  control: Control<any>
) => {
  // Map branches to react-select options
  const branchOptions = branches.map((branch) => ({
    label: branch.companyName || "Unknown Branch",
    value: branch.companyName?.toString() || "",
  }));

  return {
    branchOptions,
    SingleBranchSelect: (
      <FormField
        name="branch"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Branch:</FormLabel>
            <Select
              {...field}
              options={branchOptions}
              isMulti={false} // Disable multi-select
              isSearchable // Enable search
              placeholder="Select branch"
              value={branchOptions.find(
                (option) => option.value === field.value
              )}
              onChange={(option: SingleValue<OptionType>) =>
                field.onChange(option?.value)
              }
            />
          </FormItem>
        )}
      />
    ),
  };
};
