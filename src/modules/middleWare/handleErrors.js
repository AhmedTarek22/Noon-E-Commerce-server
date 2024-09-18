import AppError from "../../utility/appError.js";

export default function catchErrors(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(new AppError(err.message, 400));
    });
  };
}
