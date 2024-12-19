const client = require("./client");
const schema = require("./schemas");
const { desc, eq } = require("drizzle-orm");

async function getUser() {
  const db = await client.getDrizzelDbClient();
  const result = await db.select().from(schema.UserTabel);
  return result;
}

async function addUser(name, email) {
  const db = await client.getDrizzelDbClient();
  const result = await db
    .insert(schema.UserTabel)
    .values({
      name: name,
      email: email,
    })
    .returning();
  return result;
}

module.exports.getUser = getUser;
module.exports.addUser = addUser;
