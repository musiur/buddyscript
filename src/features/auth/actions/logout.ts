"use server";

import { ActionResponse } from "@/lib/types/server-action-response.interface";
import { authService } from "../server/auth.service";

export const logoutAction = async (): Promise<ActionResponse> => {
    await authService.logout();

    return {
        success: true,
    };
};