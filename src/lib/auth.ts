import type { FastifyRequest, FastifyReply } from "fastify";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // 🔑 Isso lê automaticamente o JWT do COOKIE "token"
    const user = await request.jwtVerify();

    // 🔥 ESSENCIAL: salvar no request
    request.user = user as any;
  } catch (err) {
    return reply.code(401).send({ message: "Não autorizado" });
  }
}
