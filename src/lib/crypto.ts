import { createHmac, randomBytes } from "crypto";

const SESSION_TOKEN_BYTES = 32;

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error("SESSION_SECRET environment variable is not set.");
}

export const generateSessionToken = (): string => {
    return randomBytes(SESSION_TOKEN_BYTES).toString("base64url");
};

export const hashSessionToken = (token: string): string => {
    return createHmac("sha256", sessionSecret)
        .update(token)
        .digest("hex");
};