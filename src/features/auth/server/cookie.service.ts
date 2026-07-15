import { cookies } from "next/headers";

const SESSION_COOKIE_NAME =
    process.env.AUTH_COOKIE_NAME!;

const setSession = async (token: string, expiresAt: Date) => {
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
    });
}

const getSession = async () => {
    const cookieStore = await cookies();

    return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

const deleteSession = async () => {
    const cookieStore = await cookies();

    cookieStore.delete(SESSION_COOKIE_NAME);
}


export const cookieService = {
    setSession,
    getSession,
    deleteSession
};