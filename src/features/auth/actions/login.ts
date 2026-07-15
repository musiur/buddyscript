"use server";

import { ActionResponse } from "@/lib/types/server-action-response.interface";
import { authService } from "../server/auth.service";
import { tryCatch } from "@/lib/error-handlers/tryCatch";
import { LoginFormSchema, TLoginFormSchema } from "@/features/auth/schemas/login.schema";

export const loginAction = async (
  input: TLoginFormSchema
): Promise<ActionResponse> => {
  const result = LoginFormSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data.",
    };
  }

  const { error } = await tryCatch(authService.login(result.data))

  if (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed.",
    };
  }

  return {
    success: true,
  };
};