const express = require("express");
const authenticate = require("../middleware/Authmiddleware");
const { getUserQuizCodes } = require("../controller/Testdetails/getalltestdetails");
const { getTestDetails } = require("../controller/Testdetails/gettestdetail");

const Testdetailsrouter = express.Router();

Testdetailsrouter.get("/getuserquizcodes",authenticate,getUserQuizCodes)
Testdetailsrouter.get("/getusertestdetails/:quizCode",authenticate,getTestDetails)
    
module.exports = Testdetailsrouter;