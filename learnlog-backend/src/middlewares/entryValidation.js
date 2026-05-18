const Joi = require("joi");

const entrySchema = Joi.object({
  topic: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Topic is required",
    "string.min": "Topic must be at least 3 characters long",
    "string.max": "Topic cannot exceed 100 characters",
    "any.required": "Topic is required",
  }),

  description: Joi.string().trim().min(10).max(2000).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description cannot exceed 2000 characters",
    "any.required": "Description is required",
  }),

  studyDuration: Joi.number().min(0.25).max(24).required().messages({
    "number.base": "Study duration must be a number",
    "number.min": "Study duration must be at least 0.25 hours",
    "number.max": "Study duration cannot exceed 24 hours",
    "any.required": "Study duration is required",
  }),

  difficulty: Joi.string().valid("Easy", "Medium", "Hard").required().messages({
    "any.only": "Difficulty must be Easy, Medium, or Hard",
    "any.required": "Difficulty is required",
    "string.empty": "Difficulty is required",
  }),

  date: Joi.date().required().messages({
    "date.base": "Please provide a valid date",
    "any.required": "Date is required",
  }),
});

const validateEntry = (req, res, next) => {
  const { error } = entrySchema.validate(req.body, {
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

  next();
};

module.exports = validateEntry;
