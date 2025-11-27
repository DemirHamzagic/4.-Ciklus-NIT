const express = require("express");
const router = express.Router();
const receptController = require("../controllers/recept");

router.get("/", receptController.getAllRecepts);
router.get("/:id", receptController.getRecept);
router.post("/", receptController.createRecept);
router.put("/:id", receptController.replaceRecept);
router.patch("/:id", receptController.updateRecept);
router.delete("/:id", receptController.deleteRecept);

module.exports = router;
