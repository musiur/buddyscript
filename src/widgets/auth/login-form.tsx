"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import DynamicInput from "@/components/common/form/d-input";
import DynamicSubmit from "@/components/common/form/d-submit";
import Flex from "@/components/layouts/flex-layout";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoginFormSchema, TLoginFormSchema } from "@/features/auth/schemas/login.schema";

const LoginForm = () => {
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: TLoginFormSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DynamicInput name="email" label="Email" />

        <div className="space-y-2 pb-4">
          <DynamicInput name="password" label="Password" type="password" />
          <Flex className="justify-between">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center gap-3 text-left">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Remember me</Label>
              </div>
            </RadioGroup>
            <Link
              href="#"
              className="inline-block w-full text-right text-primary hover:underline"
            >
              Forget Password?
            </Link>
          </Flex>
        </div>
        <DynamicSubmit pending={form.formState.isSubmitting} text="Login" />
      </form>
    </Form>
  );
};

export default LoginForm;