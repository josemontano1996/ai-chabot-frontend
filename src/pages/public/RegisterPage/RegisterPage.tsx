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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const RegisterPage = () => {
  const { setError } = useAppStore();
  const { onSuccessNavigation } = useNavigateWithState();
  const registerForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onRegister = async (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    try {
      const resp = await apiRest.post("/register", values);
      console.log(resp);
      onSuccessNavigation("/login", "Registration successful");
    } catch {
      setError("An error ocurred, try again later.");
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center border">
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
                      <Input {...field} placeholder="min 8 characters" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-center">
              <Button className="w-full">Login</Button>
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
