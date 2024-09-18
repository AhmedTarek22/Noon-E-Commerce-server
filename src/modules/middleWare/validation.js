export const validation = (schema) => {
  return (req, res, next) => {
    let x = schema.validate(
      { ...req.body, ...req.params },
      { abortEarly: false }
    );
    if (x.error) {
      res.status(422).json({ message: "Error", error: x.error.details });
    } else {
      next();
    }
  };
};
