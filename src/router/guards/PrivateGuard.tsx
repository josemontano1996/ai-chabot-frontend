import PrivateLayout from "@/components/layouts/PrivateLayout/PrivateLayout";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";

const PrivateGuard = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateGuard;
