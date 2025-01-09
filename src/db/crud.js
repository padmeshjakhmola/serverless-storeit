const client = require("./client");
const schema = require("./schemas");
const { desc, eq, and } = require("drizzle-orm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require("../service/user");

async function getUser() {
  const db = await client.getDrizzelDbClient();
  const result = await db.select().from(schema.UserTabel);
  return result;
}

async function addUser(name, email, password) {
  const db = await client.getDrizzelDbClient();
  const result = await db
    .insert(schema.UserTabel)
    .values({
      name: name,
      email: email,
      password: password,
    })
    .returning();
  console.log("aaaaaaaaaaaaaaaaaa", result);

  const token = await UserService.signUser(result[0].id);
  return { user: result[0], token };
}

async function login(email, password) {
  const db = await client.getDrizzelDbClient();
  const result = await db
    .select()
    .from(schema.UserTabel)
    .where(eq(schema.UserTabel.email, email));

  const checkUser = result[0];

  if (!checkUser) {
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, checkUser.password);

  if (isPasswordValid) {
    const token = await UserService.signUser(checkUser.id);
    return {
      isPasswordValid,
      token,
    };
  }
}

module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.login = login;
