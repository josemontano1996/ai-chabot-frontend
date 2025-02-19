import { Navigate, Route } from "react-router";
import { Routes } from "react-router";
import { BrowserRouter } from "react-router";
import HomePage from "../pages/public/HomePage/HomePage";
import PrivateRouter from "./PrivateRouter";
import { NotFoundPage } from "@/pages/NotFoundPage";
import PrivateGuard from "./guards/PrivateGuard";
import LoginPage from "@/pages/public/LoginPage/LoginPage";
import RegisterPage from "@/pages/public/RegisterPage/RegisterPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateGuard />}>
          <Route path="/private/*" element={<PrivateRouter />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={"/404"} />} />
      </Routes>
    </BrowserRouter>
  );
};
