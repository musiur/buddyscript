"use server";

import { ActionResponse } from "@/lib/types/server-action-response.interface";
import { authService } from "../server/auth.service";
import { tryCatch } from "@/lib/error-handlers/tryCatch";
import { RegisterFormSchema, TRegisterFormSchema } from "@/features/auth/schemas/register.schema";


export const registerAction = async (
    input: TRegisterFormSchema
): Promise<ActionResponse> => {
    const result = RegisterFormSchema.safeParse(input);

    if (!result.success) {
        return {
            success: false,
            message: "Invalid form data.",
        };
    }

    const { error } = await tryCatch(authService.register(result.data));

    if (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Registration failed.",
        };
    }

    return {
        success: true,
    };
};