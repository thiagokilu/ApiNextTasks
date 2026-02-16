import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
export const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({
        url: "file:./dev.db",
    }),
});
//# sourceMappingURL=prisma.js.map