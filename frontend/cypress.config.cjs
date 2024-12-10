"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cypress_1 = require("cypress");
exports.default = (0, cypress_1.defineConfig)({
    e2e: {
        baseUrl: 'http://95.143.172.216:45922/', // Ihre spezifische URL
        supportFile: false, // Optional, falls Sie das support File deaktivieren möchten
    },
});
