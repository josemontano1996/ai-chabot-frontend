import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../shadcn/toaster";
import { useAppStore } from "@/store/AppStore";
import { useEffect } from "react";
import { ShieldAlert } from "lucide-react";

const AppErrorToast = () => {
  const { toast } = useToast();
  const { error } = useAppStore();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: <ErrorDescription error={error} />,
      });
    }
  }, [error, toast]);

  return <Toaster />;
};

const ErrorDescription = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center gap-2 text-lg">
      <ShieldAlert />
      <p>{error}</p>
    </div>
  );
};

export default AppErrorToast;
