"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
// import dotenv from 'dotenv';
var dotenv = require("dotenv");
dotenv.config();
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
var sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'root', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '1234', {
    host: process.env.DB_HOST,
    dialect: "postgres",
    // logging: true
});
sequelize
    .authenticate()
    .then(function () { return console.log("Database connected succesfully"); })
    .catch(function () { return console.log("Failed to establish connection"); });
exports.default = sequelize;
