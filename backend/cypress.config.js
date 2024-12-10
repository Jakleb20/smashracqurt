const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    port: 45923,
    baseUrl: 'http://95.143.172.216:45920',
  },
});
