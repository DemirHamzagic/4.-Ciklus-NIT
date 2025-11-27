const express = require("express");
const router = express.Router();
const employeeCnt = require("../controllers/employees");

router.post("/", employeeCnt.createEmployee);
router.patch("/addSkill", employeeCnt.addSkill);
router.patch("/changeDep", employeeCnt.changeDepartment);
router.patch("/deActivate", employeeCnt.deActivate);
router.get("/searchEmployees", employeeCnt.searchEmployee);

module.exports = router;
