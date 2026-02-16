import type { FastifyInstance } from "fastify";
import { authenticate } from "../lib/auth.js";
import { prisma } from "../lib/prisma.js";

export default async function userRoutes(app: FastifyInstance) {
  app.get("/", { onRequest: [authenticate] }, async () => {
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
  });

  app.get("/me", { onRequest: [authenticate] }, async request => {
    return request.user;
  });

// Adicione o middleware de autenticação aqui também!
// 1. Adicione a autenticação aqui 
app.post(
  "/newTask",
  { onRequest: [authenticate] },
  async (request, reply) => {
    const { title, description, deadline } = request.body as {
      title: string;
      description?: string;
      deadline?: string;
    };

    // ✅ validação básica (evita erro do Prisma)
    if (!title || title.trim() === "") {
      return reply.status(400).send({
        message: "Título da tarefa é obrigatório",
      });
    }

    try {
      const task = await prisma.task.create({
        data: {
          title,
          description: description || null,

          // 👇 ponto MAIS IMPORTANTE
          deadline:
            deadline && !isNaN(Date.parse(deadline))
              ? new Date(deadline)
              : null,

          // 👇 forma correta de relacionar usuário
          user: {
            connect: {
              id: request.user.id, // ou request.user.sub (ver explicação abaixo)
            },
          },
        },
      });

      return reply.status(201).send(task);
    } catch (error) {
      console.error("PRISMA ERROR:", error);
      return reply.status(400).send({
        message: "Erro ao criar tarefa",
        error,
      });
    }
  }
);

app.get("/tasks", { onRequest: [authenticate] }, async (request, reply) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId: request.user.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      deadline: true,
      completed: true,
    },
  });

  return reply.send(tasks);
});

app.put("/tasks/:id", { onRequest: [authenticate] }, async (request, reply) => {
  const { id } = request.params as { id: string };
  const { title, description, deadline, completed } = request.body as any;

  try {
    const task = await prisma.task.update({
      where: { id: Number(id) }, // ✅ força number
      data: {
        title,
        description,
        completed: completed ?? false, // ✅ nunca undefined
        deadline: deadline ? new Date(deadline) : null,
      },
    });

    return reply.send(task);
  } catch (error) {
    console.error("❌ Prisma error:", error);
    return reply.status(400).send({
      message: "Erro ao atualizar tarefa",
      error,
    });
  }
});



app.patch(
  "/tasks/:id/complete",
  { onRequest: [authenticate] },
  async (request, reply) => {
    const { id } = request.params as { id: string };
    const taskId = Number(id);

    if (isNaN(taskId)) {
      return reply.status(400).send({ message: "ID inválido" });
    }

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      return reply.status(404).send({ message: "Tarefa não encontrada" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { completed: !task.completed }, // 👈 TOGGLE
    });

    return reply.status(200).send(updatedTask);
  },
);




app.delete(
  "/tasks/:id",
  { onRequest: [authenticate] },
  async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await prisma.task.delete({
        where: { id: Number(id) }, // ✅ CONVERSÃO OBRIGATÓRIA
      });

      return reply.status(204).send(); // padrão REST
    } catch (error) {
      console.error("❌ Prisma delete error:", error);
      return reply.status(400).send({
        message: "Erro ao deletar tarefa",
        error,
      });
    }
  }
);

}
