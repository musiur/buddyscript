"use server";

import { User } from "@/entities/user/model";
import { ActionResponse } from "@/lib/types/server-action-response.interface";
import { authService } from "../server/auth.service";

export const meAction = async (): Promise<ActionResponse<User>> => {
    const user = await authService.getCurrentUser();

    if (!user) {
        return {
            success: false,
        };
    }

    return {
        success: true,
        data: user,
    };
};