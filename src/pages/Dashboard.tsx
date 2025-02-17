import {
  CADashboardContainer,
  SADashboardContainer,
} from "@/components/container/dashboard";
import { useGetCurrentUserQuery } from "@/features/user/userApiSlice";

const DashboardPage = () => {
  const { data: currentUser } = useGetCurrentUserQuery();

  return (
    <div className="p-5">
      {currentUser?.role === "SUPER-ADMIN" ||
      currentUser?.role === "ADMIN" ||
      currentUser?.role === "CRM" ? (
        <SADashboardContainer />
      ) : (
        <CADashboardContainer />
      )}
    </div>
  );
};

export default DashboardPage;
