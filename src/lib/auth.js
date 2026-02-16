export async function authenticate(request, reply) {
    try {
        // 🔑 Isso lê automaticamente o JWT do COOKIE "token"
        const user = await request.jwtVerify();
        // 🔥 ESSENCIAL: salvar no request
        request.user = user;
    }
    catch (err) {
        return reply.code(401).send({ message: "Não autorizado" });
    }
}
//# sourceMappingURL=auth.js.map