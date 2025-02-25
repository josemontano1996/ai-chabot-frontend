import { useAppStore } from "@/store/AppStore";
import { ShieldAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../shadcn/alert";

const AppSuccessToast = () => {
  const { success, clearSuccess } = useAppStore();

  return (
    success && (
      <Alert
        className="absolute bottom-4 right-4 z-[99] w-[400px] max-w-[95vw] border-primary bg-white text-primary hover:cursor-pointer"
        onClick={clearSuccess}
      >
        <ShieldAlert className="h-4 w-4" color="green" />
        <AlertTitle>Succes</AlertTitle>
        <AlertDescription>{success}</AlertDescription>
      </Alert>
    )
  );
};

export default AppSuccessToast;
