const https = require('https');

module.exports = {
  async getDepartures({ homey, query }) {
    const { station, apiKey } = query;

    if (!apiKey) {
      throw new Error('Missing API Key');
    }

    if (!station) {
      throw new Error('Missing Station');
    }

    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'gateway.apiportal.ns.nl',
        path: `/reisinformatie-api/api/v2/departures?station=${encodeURIComponent(station)}`,
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'User-Agent': 'Homey/Dashy',
          'Accept': 'application/json'
        }
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const parsedData = JSON.parse(data);
              resolve(parsedData);
            } catch (e) {
              reject(new Error('Failed to parse NS API response: ' + e.message));
            }
          } else {
            reject(new Error(`NS API returned status ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', (e) => {
        reject(new Error('NS API Request failed: ' + e.message));
      });

      req.end();
    });
  },
};
