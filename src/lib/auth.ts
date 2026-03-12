import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

const googleId = process.env.AUTH_GOOGLE_ID;
const googleSecret = process.env.AUTH_GOOGLE_SECRET;
const demoPassword = process.env.DEMO_PASSWORD;

if ((!googleId || !googleSecret) && process.env.NODE_ENV !== "test") {
  console.error(
    "\n[Auth] ⚠️ Google 로그인을 사용하려면 .env에 AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET을 설정하세요.\n" +
      "  (이메일/비밀번호 로그인은 DEMO_PASSWORD만 설정하면 됩니다.)\n"
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    ...(googleId && googleSecret
      ? [
          Google({
            clientId: googleId,
            clientSecret: googleSecret,
          }),
        ]
      : []),
    Credentials({
      name: "이메일 로그인",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (!demoPassword) return null;

        const email = String(credentials.email).toLowerCase();
        const password = String(credentials.password);

        if (password !== demoPassword) return null;

        const allowed = await db.allowedUser.findUnique({
          where: { email },
        });
        if (!allowed) return null;

        return {
          id: allowed.id,
          email: allowed.email,
          name: allowed.email.split("@")[0],
          image: null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          email: token.email ?? session.user.email,
          name: token.name ?? session.user.name,
          image: token.picture ?? session.user.image,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
});
