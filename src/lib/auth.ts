import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {};

                if (email === "morshed@gmail.com" && password === "123456") {
                return { id: "101", name: "Manjur Morshed", email };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt", // ✅ Valid because we specified the correct type
    },
    secret: process.env.NEXTAUTH_SECRET,
};
