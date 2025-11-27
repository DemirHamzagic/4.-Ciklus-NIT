const express = require("express");
const controller = require("../controllers/categoryCnt");
const router = express.Router();

router.get("/:id", controller.getCategory);
router.get("/", controller.getAllCategory);
router.post("/", controller.createCategory);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);
router.get("/subCategory/", controller.subCategories);
router.get("/topCategory/", controller.topCategories);

module.exports = router;
