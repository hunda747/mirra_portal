import { DataTable } from "@/components/ui/data-table";
import { userColumns } from "./components/users/user-column";
import { User } from "@/features/user/userApiSlice";

const UserPresentation = ({ users }: { users: User[] }) => {
  return (
    <div>
      <div className="flex -mb-12 pb-8 items-center justify-between">
        <div></div>
        <div>
          {/* <Button
            size="sm"
            className="bg-primary relative"
            onClick={() => {
              // shopModal.onOpen();
            }}
          >
            <Plus className="mr-2 h-4 w-4" />

          </Button> */}
        </div>
      </div>
      <DataTable
        type="user"
        searchKey="fullName"
        clickable={true}
        columns={userColumns}
        data={users || []}
        onUrl={false}
      />
    </div>
  )
}

export default UserPresentation;
