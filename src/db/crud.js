const client = require("./client");
const schema = require("./schemas");
const { desc, eq, and } = require("drizzle-orm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  return result;
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
    const token = await jwt.sign(checkUser.id, process.env.JWT_SECRET);

    return {
      isPasswordValid,
      token,
    };
  }

  // return isPasswordValid;
}

module.exports.getUser = getUser;
module.exports.addUser = addUser;
module.exports.login = login;
