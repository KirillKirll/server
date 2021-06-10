const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

router.post(
  "/signup",
  [
    check("email", "Enter e-mail").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
  ],
  controller.signUp
);
router.post(
  "/login",
  [
    check("email", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.login
);
router.get("/me", controller.me);

// router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;
