import ChatPage from "@/pages/private/ChatPage/ChatPage";
import {  Navigate, Route, Routes } from "react-router";

const PrivateRouter = () => {
  return (
      <Routes>
            <Route path="/" element={<Navigate to="chat" />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/*" element={<Navigate to={"/404"} replace />} />
      </Routes>
  );
};

export default PrivateRouter;
