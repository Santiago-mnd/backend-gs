/*
  Rutas de productos / Product
  Host + /api/product
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

// Todas las peticiones pasan por la validación JWT
router.use(validateJWT);

router.get("/", getProducts);

router.post(
  "/new-product",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check(
      "description",
      "La descripción es obligatoria y debe de contener al menos 10 caracteres."
    )
      .not()
      .isEmpty()
      .isLength({ min: 10 }),
    check("price", "El precio es obligatorio.").not().isEmpty(),
    validateFields,
  ],
  createProduct
);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
