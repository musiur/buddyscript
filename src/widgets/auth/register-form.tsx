"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import DynamicInput from "@/components/common/form/d-input";
import DynamicSubmit from "@/components/common/form/d-submit";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { RegisterFormSchema, TRegisterFormSchema } from "@/features/auth/schemas/register.schema";
import { registerAction } from "@/features/auth/actions/register";

const RegisterForm = () => {
  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: TRegisterFormSchema) {
    const result = await registerAction(data);
    console.log(result);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DynamicInput name="firstName" label="First Name" />
        <DynamicInput name="lastName" label="Last Name" />
        <DynamicInput name="email" label="Email" />

        <DynamicInput name="password" label="Password" type="password" />
        

        <div className="space-y-4 pb-4">
          <DynamicInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
        />
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">I agree to terms & conditions</Label>
            </div>
          </RadioGroup>
        </div>

        <DynamicSubmit pending={form.formState.isSubmitting} text="Register" />
      </form>
    </Form>
  );
};

export default RegisterForm;
