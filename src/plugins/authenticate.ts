import type { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // 🔥 IMPORTANTE: liberar preflight
  if (request.method === "OPTIONS") {
    return;
  }

  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ message: "Não autorizado" });
  }
}
