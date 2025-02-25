import { ShieldAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../shadcn/alert";
import { useAppStore } from "@/store/AppStore";
const AppErrorAlert = () => {
  const { error, clearError } = useAppStore();

  return (
    error && (
      <Alert
        variant={"destructive"}
        className="absolute bottom-4 right-4 z-[99] w-[400px] max-w-[95vw] bg-white hover:cursor-pointer"
        onClick={clearError}
      >
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  );
};

export default AppErrorAlert;
