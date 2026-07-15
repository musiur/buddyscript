import type { UserWithPassword } from "@/entities/user/model";

export interface Session {
  id: string;

  tokenHash: string;

  userId: string;

  expiresAt: Date;

  createdAt: Date;

  lastSeenAt: Date;

  ipAddress: string | null;

  userAgent: string | null;
}

export interface AuthSession {
  session: Session;
  user: UserWithPassword;
}