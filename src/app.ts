import Fastify from "fastify";
import dotenv from "dotenv";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors"; // ✅ FALTAVA ISSO
import cookie from "@fastify/cookie"; // 👈 ADICIONE

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { authenticate } from "./plugins/authenticate.js";


dotenv.config();

// Verificação crítica para variáveis de ambiente
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required. Please set it in your environment.");
}

export const app = Fastify({ logger: true });



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
});


await app.register(cookie); // ✅ NOVO

app.register(jwt, {
  secret: process.env.JWT_SECRET as string,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});



app.decorate("authenticate", authenticate);



app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/users" });

console.log(app.printRoutes());
