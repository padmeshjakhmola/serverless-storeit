require("dotenv").config();
const { drizzle } = require("drizzle-orm/neon-serverless");
const schema = require("../db/schemas");
const secrets = require("../../lib/secrets");
const { Pool, neonConfig } = require("@neondatabase/serverless");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
const ws = require("ws");

async function performMigration() {
  const dbUrl = await secrets.getDatabaseUrl();
  if (!dbUrl) {
    return;
  }

  neonConfig.webSocketConstructor = ws;

  const pool = new Pool({ connectionString: dbUrl });
  pool.on("error", (err) => console.log(err));

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const db = await drizzle(client, { schema });
    await migrate(db, { migrationsFolder: "src/migrations" });

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  await pool.end();
}

if (require.main === module) {
  console.log("run Migrations!");
  performMigration()
    .then((val) => {
      console.log("Migrations Done");
      process.exit(0);
    })
    .catch((err) => {
      console.log({ migrations_error: err });
      process.exit(1);
    });
}
