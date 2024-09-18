import catchErrors from "../middleWare/handleErrors.js";
import couponModel from "../../../db/models/coupon.model.js";



const createCoupon = catchErrors(async function (req, res) {
  const { discount, code } = req.body;

  if (!discount || !code) {
    return res
      .status(400)
      .json({ message: "Enter info coupon" });
  }

  const codeCoupon = await couponModel.findOne({ code });
  if (codeCoupon) {
    return res.status(400).json({ message: "Coupon with this code already exists" });
  }

  const newCoupon = await couponModel.create({
    discount,
    code,
  });
  
  res.status(201).json({ newCoupon });
});

const deleteCoupon = catchErrors(async function (req, res) {
  const deleteCoupon = await couponModel.findByIdAndDelete(req.params.id);
  if (!deleteCoupon) return res.status(404).json({ message: "Coupon not found" });
  res.json({ message: "Coupon deleted successfully" });
});

const updateCoupon = catchErrors(async function (req, res) {
  const { id } = req.params;
  const { discount, code } = req.body;

  if (!discount && !code) {
    return res
      .status(400)
      .json({ message: "Enter info coupon" });
  }

  const updatedCoupon = await couponModel.findByIdAndUpdate(
    id,
    { discount, code },
    { new: true, runValidators: true }
  );

  if (!updatedCoupon) return res.status(404).json({ message: "Coupon not found" });
  res.json({ updatedCoupon });
});

const getAllCoupons = catchErrors(async function (req, res) {
  const coupons = await couponModel.find();
  res.json({ coupons });
});




export { createCoupon, deleteCoupon, updateCoupon, getAllCoupons };
