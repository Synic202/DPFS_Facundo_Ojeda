const { body } = require('express-validator');
const path = require('path');

module.exports = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 5 }).withMessage('Debe tener al menos 5 caracteres'),

  body('description')
    .isLength({ min: 20 }).withMessage('Debe tener al menos 20 caracteres'),

  body('image').custom((value, { req }) => {
    if (!req.file) return true;

    const ext = path.extname(req.file.originalname).toLowerCase();
    const validExt = ['.jpg', '.jpeg', '.png', '.gif'];

    if (!validExt.includes(ext)) {
      throw new Error('Formato de imagen inválido');
    }
    return true;
  })
];
