import { useNavigate } from "react-router";

interface IReturnType {
  onSuccessNavigation: (url: string, message: string) => void | Promise<void>;
  onErrorNavigation: (url: string, message: string) => void | Promise<void>;
}

export const useNavigateWithState = (): IReturnType => {
  const navigate = useNavigate();

  const onSuccessNavigation = (url: string, message: string) => {
    return navigate({
      pathname: url,
      search: new URLSearchParams({ success: message }).toString(),
    });
  };

  const onErrorNavigation = (url: string, message: string) => {
    return navigate({
      pathname: url,
      search: new URLSearchParams({ error: message }).toString(),
    });
  };
  return { onSuccessNavigation, onErrorNavigation };
};
