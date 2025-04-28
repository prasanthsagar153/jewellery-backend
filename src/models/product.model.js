import mongoose, { Schema } from "mongoose";

// Variant schema
const variantSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  inventory_policy: {
    type: String,
    required: true
  },
  compare_at_price: {
    type: String,
    required: true
  },
  option1: {
    type: String,
    required: true
  },
  option2: {
    type: String,
    default: null
  },
  option3: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  },
  taxable: {
    type: Boolean,
    required: true
  },
  barcode: {
    type: String,
    required: true
  },
  fulfillment_service: {
    type: String,
    required: true
  },
  grams: {
    type: Number,
    required: true
  },
  inventory_management: {
    type: String,
    required: true
  },
  requires_shipping: {
    type: Boolean,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  weight_unit: {
    type: String,
    required: true
  },
  inventory_item_id: {
    type: Number,
    required: true
  },
  inventory_quantity: {
    type: Number,
    required: true
  },
  old_inventory_quantity: {
    type: Number,
    required: true
  },
  admin_graphql_api_id: {
    type: String,
    required: true
  },
  image_id: {
    type: String,
    default: null
  }
});

// Option schema
const optionSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  values: {
    type: [String],
    required: true
  }
});

// Image schema
const imageSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  alt: {
    type: String,
    default: null
  },
  position: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  },
  admin_graphql_api_id: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  variant_ids: {
    type: [String],
    default: []
  }
});

// main Product schema
const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  body_html: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  product_type: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  },
  published_at: {
    type: Date,
    required: true
  },
  template_suffix: {
    type: String,
    default: ""
  },
  published_scope: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    required: true
  },
  admin_graphql_api_id: {
    type: String,
    required: true
  },
  variants: [variantSchema],
  options: [optionSchema],
  images: [imageSchema],
  image: imageSchema // Single main image reference
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;