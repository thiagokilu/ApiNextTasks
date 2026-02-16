import { app } from "./app.js";

const port = Number(process.env.PORT) || 3333;

app.listen({ 
  port, 
  host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost' 
}, err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Servidor rodando em http://${process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'}:${port} 🚀`);
});
