
🚀 Task Manager API
Uma API robusta para gerenciamento de tarefas e autenticação de usuários, construída com Fastify, Prisma ORM e SQLite/PostgreSQL.
🛠️ Tecnologias
 * Runtime: Node.js / TypeScript
 * Framework: Fastify
 * ORM: Prisma
 * Segurança: JWT (JSON Web Tokens), Cookies (httpOnly) e Bcrypt para hashing de senhas.
🔐 Autenticação (/auth)
Gerencia o ciclo de vida da sessão do usuário. A autenticação é baseada em Cookies, o que aumenta a segurança contra ataques XSS.
| Rota | Método | Descrição |
|---|---|---|
| /login | POST | Autentica o usuário e gera um Cookie httpOnly com o token JWT. |
| /signup | POST | Registra um novo usuário no banco de dados. |
| /logout | POST | Limpa o cookie de sessão do navegador. |
| /me | GET | Retorna os dados do usuário logado (Requer Token). |
📋 Gerenciamento de Tarefas (/users e /tasks)
Todas as rotas abaixo são protegidas e exigem que o usuário esteja logado. O sistema filtra automaticamente os dados para que um usuário veja apenas as suas próprias tarefas.
Usuários
 * GET /: Lista todos os usuários (apenas ID, Nome, Email e Role).
 * GET /me: Retorna o perfil do usuário autenticado através do middleware.
Tarefas (Tasks)
| Rota | Método | Descrição |
|---|---|---|
| /tasks | GET | Retorna todas as tarefas do usuário logado. |
| /newTask | POST | Cria uma nova tarefa vinculada ao ID do usuário atual. |
| /tasks/:id | PUT | Atualiza título, descrição, prazo ou status de uma tarefa. |
| /tasks/:id/complete | PATCH | Toggle: Alterna entre concluída/pendente. |
| /tasks/:id | DELETE | Remove permanentemente uma tarefa por ID. |
⚙️ Configuração e Instalação
1. Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"

2. Instalação
# Instalar dependências
npm install

# Rodar migrações do banco de dados
npx prisma migrate dev --name init

# Iniciar servidor
npm run dev

