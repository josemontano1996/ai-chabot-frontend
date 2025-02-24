import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../shadcn/toaster";
import { useAppStore } from "@/store/AppStore";
import { useEffect } from "react";
import { CircleCheck } from "lucide-react";

const AppSuccessToast = () => {
  const { toast } = useToast();
  const { success } = useAppStore();
  useEffect(() => {
    if (success) {
      toast({
        variant: "default",
        title: "Success",
        description: <SuccessDescription message={success} />,
      });
    }
  }, [success, toast]);

  return <Toaster />;
};

const SuccessDescription = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center gap-2 text-lg text-primary">
      <CircleCheck className="border-primary" />
      <p>{message}</p>
    </div>
  );
};

export default AppSuccessToast;
