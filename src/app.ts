import Fastify from "fastify";
import dotenv from "dotenv";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { authenticate } from "./plugins/authenticate.js";

dotenv.config();

// 🔐 Verificação obrigatória
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required.");
}

export const app = Fastify({
  logger: true,
});

// =======================
// ✅ CORS CONFIGURADO CERTO
// =======================
app.register(cors, {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://next-tasks-seven-lovat.vercel.app",
      "http://localhost:3000",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

// =======================
// ✅ COOKIE
// =======================
await app.register(cookie);

// =======================
// ✅ JWT COM COOKIE
// =======================
app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});

// =======================
// ✅ DECORATOR AUTH
// =======================
app.decorate("authenticate", authenticate);

// =======================
// ✅ ROTAS
// =======================
app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/users" });

// Debug
console.log(app.printRoutes());
