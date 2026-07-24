import Category from "../models/Category";
import {Request,Response} from "express";
export const createCategory=async(req:any,res:Response)=>
{
    try
    {
        console.log("create category API called");
        const{name,description}=req.body;
        console.log("Checking if category already exists");
        const existingCategory=await Category.findOne({name});
        if(existingCategory)
        {
            console.log("category already exists");
            return res.status(400).json(
            {
                success:false,
                message:"category already exists"
            });
        }
        console.log("creating category");
        const category=await Category.create(
        {
            name,
            description,
            createdBy:req.user._id
        });
        console.log("Category created successfully");
        return res.status(201).json(
        {
            success:true,
            message:"Category created successfully",
            category
        });
    }
    catch(error:any)
    {
        console.log("create category error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const getAllCategories=async(req:Request,res:Response)=>
{
    try
    {
        console.log("get all categories API called");
        const categories=await Category.find();
        console.log("categories fetched successfully");
        return res.status(200).json(
        {
            success:true,
            count:categories.length,
            categories
        });
    }
    catch(error:any)
    {
        console.log("get all categories error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};

export const getCategoryById=async(req:Request,res:Response)=>
{
    try
    {
        console.log("get category by Id api called");
        const category=await Category.findById(req.params.id);
        if(!category)
        {
            console.log("category not found");
            return res.status(404).json(
            {
                success:false,
                message:"category not found"
            });
        }
        console.log("category fetched successfully");
        return res.status(200).json(
        {
            success:true,
            category
        });
    }
    catch(error:any)
    {
        console.log("get category by Id error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const updateCategory=async(req:any,res:Response)=>
{
    try
    {
        console.log("update category API called");
        const category=await Category.findById(req.params.id);
        if(!category)
        {
            console.log("category not found");
            return res.status(404).json(
            {
                success:false,
                message:"category not found"
            });
        }
        console.log("checking category ownership");
        if(category.createdBy.toString()!==req.user._id.toString())
        {
            console.log("access denied");
            return res.status(403).json(
            {
                success:false,
                message:"you can update only categories you created"
            });
        }
        category.name=req.body.name||category.name;
        category.description=req.body.description||category.description;
        await category.save();
        console.log("category updated successfully");
        return res.status(200).json(
        {
            success:true,
            message:"category updated successfully",
            category
        });
    }
    catch(error:any)
    {
        console.log("update category error:",error.message);
        return res.status(500).json(
        {
            success:false,
            message:error.message
        });
    }
};
export const deleteCategory=async(req:any,res:Response)=>
{
    try
    {
        console.log("delete category api called");
        const category=await Category.findById(req.params.id);
        if(!category)
        {
            console.log("category not found");
            return res.status(404).json(
            {
                success:false,
                message:"category not found"
            });
        }
        console.log("checking category ownership");
        if(category.createdBy.toString()!==req.user._id.toString())
        {
            console.log("access denied");
            return res.status(403).json(
            {
                success:false,
                message:"you can delete only categories you created"
            });
        }
        await category.deleteOne();
        console.log("category deleted successfully");
        return res.status(200).json(
        {
            success:true,
            message:"category deleted successfully"
        });
    }
    catch(error:any)
    {
        console.log("delete category error:",error.message);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};