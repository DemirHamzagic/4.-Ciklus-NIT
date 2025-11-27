const express = require("express");
const router = express.Router();
const projectCnt = require("../controllers/projects");

router.post("/newProject", projectCnt.createProject);
router.patch("/changeStatus/:id", projectCnt.changeStatus);
router.post("/:id/project/:employeeId/setMember", projectCnt.setMember);
router.get("/projectBudget/:id", projectCnt.budgetStatus);
router.get("/projectStatus/:id", projectCnt.projectStatus);

module.exports = router;
