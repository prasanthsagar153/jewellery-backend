import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Product from "../models/product.model.js";

/**
 * @desc Create a new product
 */
const createProduct = asyncHandler(async (req, res) => {
  const { title, body_html, vendor, product_type, handle, variants, options, images } = req.body;

  // All required fields are provided
  if ([title, body_html, vendor, product_type, handle].some(f => !f?.trim())) {
    throw new ApiError(400, "Title, body, vendor, product type, and handle are required");
  }

  const product = await Product.create({
    title: title.trim(),
    body_html,
    vendor: vendor.trim(),
    product_type: product_type.trim(),
    handle: handle.trim(),
    variants,
    options,
    images
  });

  return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

/**
 * @desc Get all products
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

/**
 * @desc Get a single product by ID
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const product = await Product.findById(id);
  
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully"));
});

/**
 * @desc Update a product by ID
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
});

/**
 * @desc Delete a product by ID
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"));
});

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
