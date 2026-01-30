const express = require("express");
const router = express.Router();
const usersAPIController = require("../../controllers/API/users.controller");


router.get("/", usersAPIController.list);


router.get("/:id", usersAPIController.detail);

module.exports = router;
