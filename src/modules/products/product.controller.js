import productModel from "../../../db/models/product.model.js";
import subCategoryModel from "../../../db/models/subCategory.model.js";
import catchErrors from "../middleWare/handleErrors.js";

const getAllProducts = catchErrors(async function (req, res) {
  const condition = {};
  const { subCategoryId, keyword, page = 1, limit = 15 } = req.query;

  if (subCategoryId) {
    condition.subCategoryId = subCategoryId;
  }

  if (keyword) {
    condition.name = { $regex: ".*" + keyword + ".*", $options: "i" };
  }
  const offset = (page - 1) * limit;
  const products = await productModel
    .find(condition)
    .populate("subCategoryId")
    .limit(limit)
    .skip(offset);

  const total = await productModel.countDocuments(condition);

  res.json({
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
});

// const createProduct = catchErrors(async function (req, res) {
//   const { category, subCategory, itemName, price, onSale } = req.body;
//   const newProduct = await productModel.insertOne(req.body);
//   res.status(201).json({ newProduct });
// });

const createProduct = catchErrors(async function (req, res) {
  // update
  const {
    name,
    code,
    image,
    price,
    rate,
    onSale,
    priceBeforeSale,
    subCategoryId,
  } = req.body;

  if (
    !name ||
    !code ||
    !image ||
    !price ||
    !rate ||
    subCategoryId === undefined
  ) {
    return res
      .status(400)
      .json({ message: "Enter info products" });
  }

  const newProduct = await productModel.create({
    name,
    code,
    image,
    price,
    rate,
    onSale,
    priceBeforeSale,
    subCategoryId,
  });

  res.status(201).json({ newProduct });
});

const getProduct = catchErrors(async function (req, res) {
  const product = await productModel.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
});

const getSomeProducts = catchErrors(async function (req, res) {
  console.log(req.body);
  const { subCategoryName } = req.body;
  const subCategory = await subCategoryModel
    .findOne({ name: subCategoryName })
    .select("_id");

  if (!subCategory) {
    return res.status(404).json({ message: "Subcategory not found" });
  }

  const subCategoryProducts = await productModel
    .find({
      subCategoryId: subCategory._id.toString(),
    })
    .limit(12);

  res.json({
    products: subCategoryProducts,
  });
});

const deleteProduct = catchErrors(async function (req, res) {
  const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
  if (!deletedProduct)
    return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted successfully" });
});

const updateProduct = catchErrors(async function (req, res) {
  const updatedProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedProduct)
    return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Updated Successfully", updatedProduct });
});

export {
  createProduct,
  getAllProducts,
  getProduct,
  getSomeProducts,
  updateProduct,
  deleteProduct,
};
