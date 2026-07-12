"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import DynamicInput from "@/components/common/form/d-input";
import DynamicSubmit from "@/components/common/form/d-submit";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
