const express = require("express");
const router = express.Router();
const productsAPIController = require("../../controllers/API/products.controller");

router.get("/", productsAPIController.list);
router.get("/:id", productsAPIController.detail);

module.exports = router;
