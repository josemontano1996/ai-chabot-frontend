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
import { apiRest } from "@/lib/axios";
import { useAppStore } from "@/store/AppStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface loginResponse {
  payload: string;
}

const LoginPage = () => {
  const { setError } = useAppStore();
  const { saveUserToken } = useAuth();
  const navigate = useNavigate();
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      const { data } = await apiRest.post<loginResponse>("/login", values);
      if (!data) {
        console.error("No data received from login api.");
        setError(
          "Something went wrong. Try again later or contact administrator. Payload is missing.",
        );
        return;
      }
      saveUserToken(data.payload);
      navigate("/private");
    } catch (e) {
      console.error(e);
      setError("Invalid credentials");
    }
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <section className="w-full max-w-sm space-y-4 rounded-md border px-6 pb-6 pt-8">
        <h1 className="text-center text-xl">Login</h1>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLogin)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={loginForm.control}
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
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
            Don't have an account?{" "}
            <Link to={"/register"} className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
