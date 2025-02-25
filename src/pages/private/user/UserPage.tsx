import { apiRest } from "@/lib/axios";
import { useEffect, useState } from "react";
import { IUser } from "../../../types/user";
import { useAppStore } from "@/store/AppStore";
import { UpdateUserForm } from "./UpdateUserForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { SkeletonPlaceholder } from "@/components/shared/SkeletonPlaceholder";

interface apiData {
  payload: IUser;
}
const UserPage = () => {
  const [user, setUser] = useState<IUser|null>(null);
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

 

  return (
    <section>
      <h1 className="my-4 text-center text-3xl">Account management</h1>
      <Tabs defaultValue="update" className="w-full">
        <TabsList className="flex w-full justify-evenly">
          <TabsTrigger value="update">Update account</TabsTrigger>
          <TabsTrigger value="delete">Delete account</TabsTrigger>
        </TabsList>
        <TabsContent value="update">
          {user ? <UpdateUserForm user={user} /> : <SkeletonPlaceholder />}
        </TabsContent>
        <TabsContent value="delete">Change your password here.</TabsContent>
      </Tabs>
    </section>
  );
};

export default UserPage;
