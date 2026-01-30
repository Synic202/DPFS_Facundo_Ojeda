const { body } = require('express-validator');
const path = require('path');

module.exports = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('Debe tener al menos 2 caracteres'),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres'),
  
];
