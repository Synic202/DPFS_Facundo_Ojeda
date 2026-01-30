const express = require("express");
const router = express.Router();

const productsController = require("../controllers/products.controller");
const productValidator = require("../middlewares/productValidator");
const authMiddleware = require("../middlewares/authMiddleware"); 


router.get("/", authMiddleware, productsController.list);


router.get("/create", authMiddleware, productsController.createForm);
router.post("/create", authMiddleware, productValidator, productsController.store);


router.get("/:id", authMiddleware, productsController.detail);

router.get("/:id/edit", authMiddleware, productsController.editForm);
router.put("/:id", authMiddleware, productValidator, productsController.update);


router.delete("/:id", authMiddleware, productsController.destroy);

module.exports = router;
