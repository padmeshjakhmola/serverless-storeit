const {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
} = require("@aws-sdk/client-ssm");

const AWS_REGION = "ap-south-1";
const STAGE = process.env.STAGE || "prod";

async function getDatabaseUrl() {
  const DATABASE_URL_SSM_PARAM = `/serverless-storeit/${STAGE}/database-url`;

  const client = new SSMClient({ region: AWS_REGION });

  const paramStoreData = {
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true,
  };

  const command = new GetParameterCommand(paramStoreData);
  const result = await client.send(command);
  return result.Parameter.Value;
}

async function putDatabaseUrl(stage, dbUrlVal) {
  const paramStage = stage ? stage : "dev";
  if (paramStage === "prod") {
    return; //terminate and it will not run
  }
  if (!dbUrlVal) {
    return;
  }

  const DATABASE_URL_SSM_PARAM = `/serverless-storeit/${paramStage}/database-url`;

  const client = new SSMClient({ region: AWS_REGION });

  const paramStoreData = {
    Name: DATABASE_URL_SSM_PARAM,
    Value: dbUrlVal,
    Type: "SecureString",
    Overwrite: true,
  };

  const command = new PutParameterCommand(paramStoreData);
  const result = await client.send(command);
  return result;
}

module.exports.getDatabaseUrl = getDatabaseUrl;
module.exports.putDatabaseUrl = putDatabaseUrl;
