import { app } from "./app.js";

const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 3333,
      host: "0.0.0.0", // 🔥 ESSENCIAL NO RENDER
    });

    console.log("Servidor rodando 🚀");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
