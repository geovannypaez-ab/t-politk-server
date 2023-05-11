"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "T-Politik API",
            version: "1.0.0",
            describe: "Es una api para el senso de votos de una campaña politica"
        },
        servers: [
            {
                url: "http://localhost:3001"
            }
        ]
    },
    apis: ["./src/routes/*/*.doc.ts"]
};
