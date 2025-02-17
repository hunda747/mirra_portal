import { CADashboardPresentation } from "@/components/presentation/dashboard";
import { useGetReportQuery } from "@/features/reports/reportApiSlice";
import { useGetCurrentUserQuery } from "@/features/user/userApiSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CADashboardContainer = () => {
  const params = useParams();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data: currentUser } = useGetCurrentUserQuery();

  const { data: reports } = useGetReportQuery({
    cliendId: params.clientId ? params.clientId : "",
  });

  return (
    <div>
      <CADashboardPresentation
        reports={reports}
        currentUser={currentUser}
        setYear={setYear}
        year={year}
      />
    </div>
  );
};

export default CADashboardContainer;
