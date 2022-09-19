import { clientFromToken } from "scalingo";
import config from "../../config.js";

let client;
let tokenLastUpdate;

async function getClient() {
  if (!client) {
    client = await clientFromToken(config.provider.scalingo.apiToken, { apiUrl: 'https://api.osc-fr1.scalingo.com' });
    tokenLastUpdate = new Date();
  } else {
    const now = new Date();
    if (((now - tokenLastUpdate) / 1000) > (3600 - 60)) {
      // if current bearer token was generated 59mn ago or more…
      client._token = await client.Tokens.exchange(config.provider.scalingo.apiToken);
    }
  }
  return client;
}

export default getClient;