"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cypress_1 = require("cypress");
exports.default = (0, cypress_1.defineConfig)({
    e2e: {
        port: 45922,
        supportFile: false, // Optional, falls Sie das support File deaktivieren möchten
    },
});
