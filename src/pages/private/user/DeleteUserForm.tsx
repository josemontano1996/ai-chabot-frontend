import { Button } from "@/components/shadcn/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigateWithState } from "@/hooks/useNavigateWithState";
import { apiRest } from "@/lib/axios";
import { useAppStore } from "@/store/AppStore";

export const DeleteUserForm = () => {
  const { setError } = useAppStore();
  const { removeAuthToken } = useAuth();
  const { onSuccessNavigation } = useNavigateWithState();
  async function onDelete() {
    console.log("ere");
    try {
      await apiRest.delete("/private/user/delete");

      removeAuthToken();
      onSuccessNavigation("/", "Account deleted succesfully");
    } catch {
      setError("An error ocurred, try again later");
    }
  }

  return (
    <div className="space-y-2">
      <h2>Are you sure you want to delete your account?</h2>
      <Button variant={"destructive"} onClick={onDelete}>
        Delete account
      </Button>
    </div>
  );
};
