const { response } = require("express");
const Deadline = require("../models/Deadline");
const getPunctualRate = require("../helpers/getPunctualRate");
const getNormalRate = require("../helpers/getNormalRate");

const createDeadline = async (req, res = response) => {
  const { weeks } = req.body;

  try {
    let deadline = await Deadline.findOne({ weeks });

    if (deadline) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe este plazo.",
      });
    }

    deadline = new Deadline(req.body);

    deadline.punctualRate = getPunctualRate(weeks);
    deadline.normalRate = getNormalRate(weeks);

    await deadline.save();

    res.status(201).json({
      ok: true,
      deadline,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno, por favor contacte al administrador.",
    });
  }
};

const getDeadlines = async (req, res = response) => {
  const deadlines = await Deadline.find();
  res.status(200).json({
    ok: true,
    deadlines,
  });
};

module.exports = { createDeadline, getDeadlines };
