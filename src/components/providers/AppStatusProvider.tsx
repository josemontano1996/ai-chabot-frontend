import { ReactNode, useEffect } from "react";
import AppErrorToast from "../shared/AppErrorToast";
import { useSearchParams } from "react-router";
import AppSuccessToast from "../shared/AppSuccessToast";
import { useAppStore } from "@/store/AppStore";

interface Props {
  children: ReactNode;
}
const AppStatusProvider = ({ children }: Props) => {
  const [searchParams] = useSearchParams();
  const { setError, setSuccess } = useAppStore();
  const successMessage = searchParams.get("success");
  const errorMessage = searchParams.get("error");
  useEffect(() => {
    if (successMessage) {
      setSuccess(successMessage);
    }

    if (errorMessage) {
      setError(errorMessage);
    }
  }, [successMessage, errorMessage, setError, setSuccess]);

  return (
    <div>
      <AppSuccessToast />
      <AppErrorToast />
      {children}
    </div>
  );
};

export default AppStatusProvider;
