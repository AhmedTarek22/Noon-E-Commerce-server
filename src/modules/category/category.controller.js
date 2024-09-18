import categoryModel from "../../../db/models/category.model.js";
import catchErrors from "../middleWare/handleErrors.js";


const addCategory = catchErrors( async function (req,res){
    const {name} = req.body;
    const newCategory = await categoryModel.create({name});
    res.status(201).json({message:"Added",newCategory});
})


const getAllCategories = catchErrors(async function (req,res){
    const categories = await categoryModel.find();
    res.json({message:"Success",categories});
})

const getCategory = catchErrors (async function (req,res){
    const oneCategory = await categoryModel.findById(req.params.id);
    if(!oneCategory) return res.status(404).json({message: "Category not found"});

    res.json({message:"Success",oneCategory});
})

const deleteCategory = catchErrors (async function (req,res){
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if(!category) return res.status(404).json({message: "Category not found"});
    res.json({message: "Category deleted successfully"});
})

const updateCategory = catchErrors (async function (req,res){
    const {name} = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, {name}, {new: true});

    if(!updatedCategory) return res.status(404).json({message: "Category not found"});

    res.json({message:"Category updated successfully",updatedCategory});

})



export {
    addCategory,
    getAllCategories,
    getCategory,
    deleteCategory,
    updateCategory
 };
