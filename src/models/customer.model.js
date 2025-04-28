import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  customer_id: {
    type: Number,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: null
  },
  address1: {
    type: String,
    default: null
  },
  address2: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  province: {
    type: String,
    default: null
  },
  country: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  province_code: {
    type: String,
    default: null
  },
  country_code: {
    type: String,
    required: true
  },
  country_name: {
    type: String,
    required: true
  },
  default: {
    type: Boolean,
    default: false
  }
});

const emailMarketingConsentSchema = new Schema({
  state: {
    type: String,
    required: true
  },
  opt_in_level: {
    type: String,
    required: true
  },
  consent_updated_at: {
    type: Date,
    required: true
  }
});

const customerSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  orders_count: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  total_spent: {
    type: String,
    required: true
  },
  last_order_id: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    default: null
  },
  verified_email: {
    type: Boolean,
    default: false
  },
  multipass_identifier: {
    type: String,
    default: null
  },
  tax_exempt: {
    type: Boolean,
    default: false
  },
  tags: {
    type: String,
    default: ""
  },
  last_order_name: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: null
  },
  addresses: [addressSchema],
  tax_exemptions: {
    type: [String],
    default: []
  },
  email_marketing_consent: emailMarketingConsentSchema,
  sms_marketing_consent: {
    type: String,
    default: null
  },
  admin_graphql_api_id: {
    type: String,
    required: true
  },
  default_address: addressSchema
}, { timestamps: true });

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;