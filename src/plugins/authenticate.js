export async function authenticate(request, reply) {
    // 🔥 IMPORTANTE: liberar preflight
    if (request.method === "OPTIONS") {
        return;
    }
    try {
        await request.jwtVerify();
    }
    catch (err) {
        reply.status(401).send({ message: "Não autorizado" });
    }
}
//# sourceMappingURL=authenticate.js.map