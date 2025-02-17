import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { useAppDispatch } from "@/hooks";
import { setToken } from "@/features/auth/authSlice";
import { useAuth } from "@/contexts/AuthContext";
import cmsLogo from "@/assets/images/ONBOARDING.png";
import { Loader } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof formSchema>;

function LoginCard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginMutation();
  const { login } = useAuth();
  const [message, setMessage] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
    localStorage.removeItem("clientId");
    try {
      setLoading(true);
      const response = await loginUser(data).unwrap();
      if (response?.accessToken) {
        login(response.accessToken, response.refreshToken);
        dispatch(setToken(response.accessToken));

        // if (role?.includes("SUPER-ADMIN")) {
        //   navigate("/dashboard/dashboard");
        // } else if (role?.includes("AGENT-ADMIN")) {
        //   navigate("/agents/dashboard");
        // } else {
        //   navigate("/users/dashboard");
        // }
        navigate("/");
        window.location.reload();
        toast.success("Login successful");
      }
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setMessage(error?.data?.error || "Something went wrong");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed right-1/2 top-1/2 z-[100]">
          <Loader />
        </div>
      )}

      <section className={`dark:bg-gray-900 ${loading && "opacity-50"}`}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex w-full items-center justify-center">
            <div className="w-full flex justify-center">
              <div className="w-full bg-white rounded-r-lg shadow border dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-center mt-6">
                  <img src={cmsLogo} alt="logo" width={150} />
                </div>
                <div className="space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-cyan-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  {message && (
                    <span className="text-red-500 border rounded-lg bg-red-50 flex px-2 py-3">
                      {message}
                    </span>
                  )}
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8 w-full"
                    >
                      <div className="space-y-4 md:space-y-4">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username:</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  className="ring-1"
                                  placeholder="username"
                                  disabled={loading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password:</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  className="ring-1"
                                  placeholder="••••••••"
                                  disabled={loading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none"
                            >
                              Remember me
                            </label>
                          </div>
                          <a
                            href="/auth/forgotpassword"
                            className="text-sm font-medium text-cyan-500 hover:underline dark:text-cyan-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <Button
                          disabled={loading}
                          type="submit"
                          className="w-full bg-cyan-500 text-white"
                        >
                          SIGN IN
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginCard;
