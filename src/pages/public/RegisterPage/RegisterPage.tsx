import { Button } from "@/components/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { useNavigateWithState } from "@/hooks/useNavigateWithState";
import { apiRest } from "@/lib/axios";
import { useAppStore } from "@/store/AppStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const { setError } = useAppStore();
  const { onSuccessNavigation } = useNavigateWithState();
  const registerForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegister = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    try {
      await apiRest.post("/register", values);
      onSuccessNavigation("/login", "Registration successful");
    } catch {
      setError("An error ocurred, try again later.");
    }
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <section className="w-full max-w-sm space-y-4 rounded-md border px-6 pb-6 pt-8">
        <h1 className="text-center text-xl">Register</h1>
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onRegister)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={registerForm.control}
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
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="min 8 characters"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="min 8 characters"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-center">
              <Button className="w-full">Submit</Button>
            </div>
          </form>
        </Form>
        <div className="text-right text-xs">
          <p className="p-1">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
