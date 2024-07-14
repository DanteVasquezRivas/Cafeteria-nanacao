const { header, param, body, validationResult } = require("express-validator");

const updateValidator = [
  param("id")
    .notEmpty()
    .withMessage("Debes pasar un ID")
    .isInt()
    .withMessage("Debe ser un entero"),
  (req, res, next) => {
    const errors = validationResult(req).mapped();
    console.log(Object.keys(errors));
    if (Object.keys(errors).length) {
      res.send(errors);
    } else {
      next();
    }
  },
];

const addValidator = [
  body("nombre").notEmpty().withMessage("Debes proporcionar un nombre"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const CafesValidatorCollection = {
  updateValidator,
  addValidator,
};

module.exports = {
  CafesValidatorCollection,
};
