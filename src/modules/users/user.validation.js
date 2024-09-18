import Joi from "joi";

const userValidationSchema = Joi.object({
  fullName: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[A-Z][a-z0-9]{7,20}$"))

    .required(),
  confirmPassword: Joi.ref("password"),
});

const userLogInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[A-Z][a-z0-9]{7,20}$"))
    .required(),
});

const updateUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(15).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string()
    .pattern(new RegExp("^[A-Z][a-z0-9]{7,20}$"))

    .optional(),
  confirmPassword: Joi.ref("password"),
});

export { userValidationSchema, userLogInSchema, updateUserValidationSchema };
