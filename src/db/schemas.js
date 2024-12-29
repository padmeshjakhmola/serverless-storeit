const { integer, pgTable, varchar, uuid } = require("drizzle-orm/pg-core");
const UserTabel = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

module.exports.UserTabel = UserTabel;
