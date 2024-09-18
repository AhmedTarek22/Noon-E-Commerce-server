import subCategoryModel from "../../../db/models/subCategory.model.js";
import catchErrors from "../middleWare/handleErrors.js";

const addSubCategory = catchErrors(async (req, res) => {
  const { name, categoryId } = req.body;
  const newSubCategory = await subCategoryModel.create({ name, categoryId });
  res.status(201).json({ message: "Added", newSubCategory });
});

const getAllSubCategories = catchErrors(async (req, res) => {
  const subcategories = await subCategoryModel.find();
  res.json({ message: "Success", subcategories });
});

const getSubCategory = catchErrors(async (req, res) => {
  const oneSubCategory = await subCategoryModel.findById(req.params.id);
  if (!oneSubCategory)
    return res.status(404).json({ message: "Subcategory not found" });
  res.json({ message: "Success", oneSubCategory });
});

const updateSubCategory = catchErrors(async (req, res) => {
  const { name } = req.body;
  const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );
  if (!updatedSubCategory)
    return res.status(404).json({ message: "Subcategory not found" });
  res.json({ message: "Subcategory updated successfully", updatedSubCategory });
});

const deleteSubCategory = catchErrors(async function (req, res) {
  const SubCategory = await subCategoryModel.findByIdAndDelete(req.params.id);
  if (!SubCategory)
    return res.status(404).json({ message: "SubCategory not found" });
  res.json({ message: "SubCategory deleted successfully" });
});

export {
  getAllSubCategories,
  getSubCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
