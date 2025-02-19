import PrivateLayout from "@/components/layouts/PrivateLayout/PrivateLayout";
import { Navigate, Outlet } from "react-router";

const PrivateGuard = () => {
  const authenticated = true;
  return authenticated ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateGuard;
