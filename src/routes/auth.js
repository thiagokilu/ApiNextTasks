import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
export default async function authRoutes(app) {
    app.post("/login", async (request, reply) => {
        const { email, password } = request.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return reply.code(401).send({ message: "Invalid credentials" });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return reply.code(401).send({ message: "Invalid credentials" });
        }
        const token = app.jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
        return reply
            .setCookie("token", token, {
            httpOnly: true,
            secure: false, // true em produção
            sameSite: "lax",
            path: "/",
        })
            .send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    });
    app.post("/signup", async (request, reply) => {
        const { name, email, password } = request.body;
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return reply.code(400).send({ message: "Email já cadastrado" });
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 10),
                role: "user",
            },
        });
        return reply.code(201).send(user);
    });
    app.get("/users", async (request, reply) => {
        const users = await prisma.user.findMany();
        return reply.send(users);
    });
    app.post("/logout", async (_request, reply) => {
        reply
            .clearCookie("token", {
            path: "/",
        })
            .status(200)
            .send({ message: "Logout realizado" });
    });
}
//# sourceMappingURL=auth.js.map