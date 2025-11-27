const express = require("express");
const controller = require("../controllers/productCnt");
const router = express.Router();

router.get("/:id", controller.getProduct);
router.get("/", controller.getAllProducts);
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);
router.get("/priceRange", controller.productPriceRange);
router.get("/category-manufacturer", controller.productCatMan);
router.get("/priceSort", controller.productMinMaxPrice);
router.get("/bestSellers", controller.bestSeller);
router.get("/averageRating/:id", controller.productAvgRating);

module.exports = router;
