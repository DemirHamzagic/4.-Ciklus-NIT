const express = require("express");
const router = express.Router();
const departmentCnt = require("../controllers/departments");

router.get("/setEmployee", departmentCnt.setEmployee);
router.get("/changeDepHead/:id", departmentCnt.changeHead);
router.get("/departmentProjects", departmentCnt.getProjects);
router.get("/allSalaries", departmentCnt.allSalaries);
router.post("/newDepartment", departmentCnt.createDepartment);

module.exports = router;
