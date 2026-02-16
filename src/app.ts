import Fastify from "fastify";
import dotenv from "dotenv";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors"; // ✅ FALTAVA ISSO
import cookie from "@fastify/cookie"; // 👈 ADICIONE

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { authenticate } from "./plugins/authenticate.js";


dotenv.config();

export const app = Fastify({ logger: true });



app.register(cors, {
  origin: "https://next-tasks-seven-lovat.vercel.app/",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
