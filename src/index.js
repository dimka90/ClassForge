"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.listen(3000, function () {
    console.log(process.env.DB_NAME);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PORT);
    console.log("Welcome Home");
});
