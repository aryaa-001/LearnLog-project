const Joi = require("joi");

const registerSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "Full name is required",
      "string.min": "Full name must be at least 3 characters long",
      "string.max": "Full name cannot exceed 50 characters",
      "string.pattern.base":
        "Full name can only contain letters and spaces",
      "any.required": "Full name is required",
    }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({
      tlds: { allow: false },
    })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password cannot exceed 30 characters",
      "any.required": "Password is required",
    }),

  age: Joi.number()
    .integer()
    .min(18)
    .max(100)
    .required()
    .messages({
      "number.base": "Age must be a number",
      "number.integer": "Age must be a whole number",
      "number.min": "You must be at least 18 years old",
      "number.max": "Please enter a valid age",
      "any.required": "Age is required",
    }),
});

const validateRegister = (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((err) => err.message);

    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  req.body = value;
  next();
};

module.exports = validateRegister;