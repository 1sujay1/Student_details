const express = require("express");
const router = express.Router();

/**
 * Roles for route access
 */
const roles = {
  student: ["STUDENT"],
  teacher: ["TEACHER"],
  admin: ["ADMIN"],
  studentAdminTeacher: ["STUDENT", "ADMIN", "TEACHER"],
};

/**
 * Import controllers
 */
const student = require("../controllers/userController");

/**
 * Middlewares
 */
/**
 * Will Check Schema validation and token validation
 * @param {*} schema check scheam fields and types are valid or not.
 * @param {*} tokenVerify [true] [false] based on boolean it will check token vaild or not.
 */
var authorize = function (schema, tokenVerify, role) {
  //Middleware for handling Authentication code goes here...
  //schema : ==> null indicates no authorization
  //tokenVerify : ==> false indicates no auth
  //role : ==> Based on role, api access is provided eg: STUDENT
  //   next();
};

/**PROPERTIES */
router.post("/student", student.createUser); //Dynamically handled create and update within One
router.get("/student", student.getUser);
router.delete("/student/:id", student.deleteUser);

module.exports = router;
