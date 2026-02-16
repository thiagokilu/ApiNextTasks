import { app } from "./app.js";
app.listen({ port: 3333 }, err => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log("Servidor rodando em http://localhost:3333 🚀");
});
//# sourceMappingURL=server.js.map