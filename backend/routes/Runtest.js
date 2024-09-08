const express = require("express");
const authenticate = require("../middleware/Authmiddleware");
const copyQuizData = require("../controller/Runquiz/Runquiz");
const handleQuizUpdate = require("../controller/Runquiz/handlequizupdate");

const Runtestrouter = express.Router();

Runtestrouter.get("/start/:quizCode",authenticate,copyQuizData)
Runtestrouter.get("/handlequizupdate",authenticate,handleQuizUpdate)

module.exports = Runtestrouter;