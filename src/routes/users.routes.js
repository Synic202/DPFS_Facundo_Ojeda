const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const usersController = require("../controllers/users.controller");
const guestMiddleware = require("../middlewares/guest");
const authMiddleware = require("../middlewares/cookieauth");


router.get("/register", guestMiddleware, usersController.registerForm);
router.post(
  "/register",
  [
    body("firstName").notEmpty().withMessage("El nombre es obligatorio"),
    body("lastName").notEmpty().withMessage("El apellido es obligatorio"),
    body("email").isEmail().withMessage("Debe ser un email válido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
  ],
  usersController.store
);


router.get("/login", guestMiddleware, usersController.loginForm);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Debe ser un email válido"),
    body("password").notEmpty().withMessage("La contraseña es obligatoria")
  ],
  usersController.login
);


router.get("/profile", authMiddleware, usersController.profile);

router.post("/logout", authMiddleware, usersController.logout);

module.exports = router;
