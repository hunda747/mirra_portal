import UserPresentation from "@/components/presentation/admins/UserPresentation";
import { useGetAllUsersQuery } from "@/features/user/userApiSlice";

const UserContainer = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();

  return (
    <div>
      <UserPresentation users={users || []} />
    </div>
  )
}

export default UserContainer;
