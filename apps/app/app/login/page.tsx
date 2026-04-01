"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { AlertCircle, GalleryVerticalEnd, Loader2, Play } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ModeToggle } from "@/components/mode-toggle";
import { useLogin } from "@/hooks/use-auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const useDemoAccount = () => {
    form.setValue("email", "demo@orion-kit.dev");
    form.setValue("password", "demo123");
  };

  useEffect(() => {
    if (loginMutation.isError) {
      form.setError("root", {
        message: loginMutation.error?.message || "Login failed",
      });
    }
  }, [loginMutation.isError, loginMutation.error, form]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a className="flex items-center gap-2 font-medium" href="/">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Orion Kit
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm space-y-4">
            {/* Demo Account Banner */}
            <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-950/20 dark:to-indigo-950/20">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Play className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-900 text-sm dark:text-blue-100">
                    Try the demo account
                  </h3>
                  <p className="mt-1 text-blue-700 text-xs dark:text-blue-300">
                    Experience the full dashboard with sample data
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      className="h-7 text-xs"
                      onClick={useDemoAccount}
                      size="sm"
                      variant="outline"
                    >
                      Use Demo Account
                    </Button>
                    <span className="text-blue-600 text-xs dark:text-blue-400">
                      demo@orion-kit.dev
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>
                  Enter your credentials to sign in to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {loginMutation.isError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {form.formState.errors.root?.message || "Login failed"}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-sm">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                      <p className="text-destructive text-sm">
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    disabled={loginMutation.isPending}
                    type="submit"
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">
                    Don't have an account?{" "}
                  </span>
                  <Link className="text-primary hover:underline" href="/signup">
                    Sign up
                  </Link>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    className="text-muted-foreground text-sm hover:underline"
                    href="/"
                  >
                    ← Back to home
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            alt="Login"
            className="h-3/4 w-3/4 max-w-md object-contain"
            src="/assets/undraw_launching_szjw.svg"
          />
        </div>
      </div>
    </div>
  );
}
