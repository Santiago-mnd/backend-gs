const { response } = require("express");
const Product = require("../models/Product");

const createProduct = async (req, res = response) => {
  const { name } = req.body;

  try {
    let product = await Product.findOne({ name });

    if (product) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un producto con el mismo nombre.",
      });
    }

    product = new Product(req.body);

    product.user = req.uid;

    await product.save();

    res.status(201).json({
      ok: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, por favor contacte al administrador.",
    });
  }
};

const getProducts = async (req, res = response) => {
  const products = await Product.find().populate("user", "name");
  res.json({
    ok: true,
    products,
  });
};

const updateProduct = async (req, res = response) => {
  const productId = req.params.id;
  const uid = req.uid;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        ok: false,
        msg: "El producto no existe.",
      });
    }

    const newProduct = {
      ...req.body,
      user: uid,
    };

    const productUpdated = await Product.findByIdAndUpdate(
      productId,
      newProduct,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      product: productUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const deleteProduct = async (req, res = response) => {
  const productId = req.params.id;
  const uid = req.uid;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({
        ok: false,
        msg: "El producto no existe.",
      });
    }

    const productDeleted = await Product.findByIdAndDelete(productId);

    res.status(410).json({
      ok: true,
      product: productDeleted,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
