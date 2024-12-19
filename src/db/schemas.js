const { integer, pgTable, varchar } = require("drizzle-orm/pg-core");
const LeadTabel = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

module.exports.LeadTabel = LeadTabel;
