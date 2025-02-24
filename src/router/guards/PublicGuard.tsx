import PublicLayout from "@/components/layouts/PublicLayout/PublicLayout";
import { Outlet } from "react-router";

const PrivateGuard = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PrivateGuard;
