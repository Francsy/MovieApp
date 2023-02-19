const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "projectId": "3ow1ib",
    "baseUrl": "http://localhost:3000",
    "video": true,
    "videoRecording": "always"
  },
});
