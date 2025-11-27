const express = require("express");
const controller = require("../controllers/ratingCnt");
const router = express.Router();

router.get("/:id", controller.getRating);
router.get("/", controller.getAllRatings);
router.post("/", controller.createRating);
router.put("/:id", controller.updateRating);
router.delete("/:id", controller.deleteRating);

module.exports = router;
