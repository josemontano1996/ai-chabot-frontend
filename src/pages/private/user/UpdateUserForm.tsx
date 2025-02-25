import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IUser } from "../../../types/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { useAppStore } from "@/store/AppStore";
import { apiRest } from "@/lib/axios";

const updateFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

interface Props {
  user: IUser;
}

export const UpdateUserForm = ({ user }: Props) => {
  const { setError, setSuccess } = useAppStore();
  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      email: user.email,
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    try {
      const reqBody: IUser = {
        id: user.id,
        email: values.email,
        password: values.password,
      };
      await apiRest.put("/private/user", reqBody);
      setSuccess("Account updated succesfully.");
    } catch {
      updateForm.reset();
      setError("An error ocurred try again later.");
    }
  }
  return (
    <Form {...updateForm}>
      <form onSubmit={updateForm.handleSubmit(onSubmit)} className="py-2">
        <div className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={updateForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-center">
            <Button className="w-full">Login</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
