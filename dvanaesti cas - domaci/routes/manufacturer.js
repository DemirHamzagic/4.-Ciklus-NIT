const express = require("express");
const controller = require("../controllers/manufacturerCnt");
const router = express.Router();

router.get("/:id", controller.getManufacturer);
router.get("/", controller.getAllManufacturer);
router.post("/", controller.createManufacturer);
router.put("/:id", controller.updateManufacturer);
router.delete("/:id", controller.deleteManufacturer);
router.get("/topMan", controller.topManufacturer);
router.get("/productsBasedIn/", controller.countryManufacturer);
router.get("/averageMan", controller.AverageManPrice);

module.exports = router;
