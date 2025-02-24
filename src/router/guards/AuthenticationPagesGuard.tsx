import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const errorMessage = "You are already logged in";
const formattedMessage = encodeURI(errorMessage);

const AuthenticationPagesGuard = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to={`/private?error=${formattedMessage}`} replace />
  ) : (
    <Outlet />
  );
};

export default AuthenticationPagesGuard;
