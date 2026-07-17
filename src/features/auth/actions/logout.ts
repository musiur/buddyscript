"use server"

import { ActionResponse } from "@/lib/types/server-action-response.interface"
import { authService } from "../server/auth.service"
import { redirect } from "next/navigation"

export const logoutAction = async (): Promise<ActionResponse> => {
  await authService.logout()

  redirect("/login", "replace")
}
