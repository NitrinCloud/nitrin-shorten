import { int, mysqlTableCreator, text, varchar } from "drizzle-orm/mysql-core";

const createTable = mysqlTableCreator((name) => `short_${name}`);

export const urls = createTable("url", {
  id: int("id").primaryKey().autoincrement(),
  url: text("url").notNull(),
  slug: varchar("slug", {
    length: 16,
  })
    .notNull()
    .unique(),
});
