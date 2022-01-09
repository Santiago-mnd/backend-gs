/*

  Ruta de plazos / deadlines
  host + /api/deadlines

*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { createDeadline, getDeadlines } = require("../controllers/deadlines");

router.use(validateJWT);

router.get("/", getDeadlines);

router.post(
  "/new-deadline",
  [check("weeks", "El plazo es obligatorio.").not().isEmpty(), validateFields],
  createDeadline
);

module.exports = router;
