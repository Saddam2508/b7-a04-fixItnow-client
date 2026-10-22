"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { registerUser } from "@/lib/actions/user";
import { FormEvent } from "react";
import { IUser, Role } from "../user/userTypes";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    if (typeof name !== "string") {
      throw new Error("Name is required");
    }
    const email = formData.get("email");
    if (typeof email !== "string") {
      throw new Error("Email is required");
    }
    const password = formData.get("password");
    if (typeof password !== "string") {
      throw new Error("Password is required");
    }

    const roleValue = formData.get("role");
    if (roleValue !== "CUSTOMER" && roleValue !== "TECHNICIAN") {
      throw new Error("Please select a valid role");
    }

    const role: IUser["role"] = roleValue;

    const user: IUser = {
      name,
      email,
      password,
      role,
    };
    const result = await registerUser(user);
    console.log(result);
    if (result.success) {
      toast.add({ title: result.message || "Registration success" });
      router.push("/auth/signin");
    }
    if (!result.success) {
      toast.add({ title: result.message || "Registration failed" });
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="your name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>

            <RadioGroup
              name="role"
              defaultValue="CUSTOMER"
              className="flex gap-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="CUSTOMER" id="Customer" />
                <Label htmlFor="CUSTOMER">Customer</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="TECHNICIAN" id="Technician" />
                <Label htmlFor="TECHNICIAN">Technician</Label>
              </div>
            </RadioGroup>

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
};

export default RegisterForm;
