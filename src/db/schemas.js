const { integer, pgTable, varchar, uuid } = require("drizzle-orm/pg-core");
const UserTabel = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

module.exports.UserTabel = UserTabel;
