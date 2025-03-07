import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Admin } from "@/features/admin/adminApiSlice";
import { useAdminModal } from "@/hooks/use-admin-modal";

interface AdminListPresentationProps {
  admins: Admin[] | String;
}

const AdminListPresentation: FC<AdminListPresentationProps> = ({
  admins,
}) => {
  const adminModal = useAdminModal();

  return (
    <Card className="w-full rounded-xl shadow-lg bg-white">
      {/* <CardHeader className="p-6 border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Products and Prices
        </CardTitle>
      </CardHeader> */}
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(admins) && admins.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">
                  {item.username}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {item.role.name}
                </TableCell>
                <TableCell>
                  {item.createdAt ? format(new Date(item.createdAt.toString()), "MM/dd/yyyy") : "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => adminModal.onOpen(item)}
                  >
                    <Pencil />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminListPresentation; 