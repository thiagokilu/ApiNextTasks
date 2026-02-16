import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      name: string;
      email: string;
      role: "admin" | "user";
    };
  } 
}
