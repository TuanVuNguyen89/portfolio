import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";
import * as schema from "../db/schema";

export const getAuth = (env: any) => {
  const db = getDb(env.DB);
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: {
        ...schema,
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification
      }
    }),
    emailAndPassword: {
      enabled: true
    },
    // Add other providers or plugins here
    trustedOrigins: ["http://localhost:5173", "http://127.0.0.1:5173"] // Allow local dev
  });
};
