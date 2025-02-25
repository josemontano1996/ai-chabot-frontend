import { ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router";
import AppSuccessToast from "../shared/AppSuccessToast";
import { useAppStore } from "@/store/AppStore";
import AppErrorAlert from "../shared/AppErrorToastAlert";

interface Props {
  children: ReactNode;
}
const AppStatusProvider = ({ children }: Props) => {
  const [searchParams] = useSearchParams();
  const { setError, setSuccess, clearError, clearSuccess } = useAppStore();
  const successMessage = searchParams.get("success");
  const errorMessage = searchParams.get("error");
  useEffect(() => {
    clearError();
    clearSuccess();
  }, [clearError, clearSuccess]);
  
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
      <AppErrorAlert />
      {children}
    </div>
  );
};

export default AppStatusProvider;
