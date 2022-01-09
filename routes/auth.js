/* 

  Rutas de usuarios / Auth
  host + /api/auth

*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const { createUser, loginUser, renewToken } = require("../controllers/auth");

router.post(
  "/new-user",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "El email es obligatorio.").not().isEmpty().isEmail(),
    check("password", "La contraseña debe contener mínimo 5 caracteres.")
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    validateFields,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio.").not().isEmpty().isEmail(),
    check("password", "La contraseña debe contener mínimo 5 caracteres.")
      .not()
      .isEmpty()
      .isLength({ min: 5 }),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
