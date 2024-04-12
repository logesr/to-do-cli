const axios = require('axios');

async function callApi(method, url, body = undefined) {
  const config = { method, url };
  if (body) {
    config.data = body;
  }
  return await axios(config)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

module.exports = callApi;
