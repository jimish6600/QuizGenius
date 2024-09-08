const express = require("express");
const Sharecode = require("../controller/Sharetest.js/ShareTestUsingCode");
const authenticate = require("../middleware/Authmiddleware");

const Sharetestrouter = express.Router();

Sharetestrouter.post("/sharecode/:quizCode",authenticate,Sharecode);

module.exports = Sharetestrouter;