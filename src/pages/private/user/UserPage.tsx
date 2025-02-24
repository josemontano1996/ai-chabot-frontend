import { apiRest } from "@/lib/axios";
import { useEffect, useState } from "react";
import { IUser } from "../../../types/user";
import { useAppStore } from "@/store/AppStore";

interface apiData {
  payload: IUser;
}
const UserPage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { setError } = useAppStore();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await apiRest.get<apiData>("/private/user");
        setUser({
          email: data.payload.email,
          id: data.payload.id,
        });
      } catch {
        setError("Something went wrong try again later.");
      }
    };

    fetchUser();
  }, [setError]);

  return <div>{JSON.stringify(user)}</div>;
};

export default UserPage;
