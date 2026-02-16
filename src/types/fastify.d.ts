import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }

  interface FastifyRequest {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}
