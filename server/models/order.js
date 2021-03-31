const mongoose = require("mongoose");
const itemSchema = require("./itemSchema");

const lineItemSchema = new mongoose.Schema({
  qty: { type: Number, default: 1 },
  item: itemSchema,
});

lineItemSchema.virtual("extPrice").get(
  function () {
    return this.qty * this.item.price;
  },
  {
    toJSON: { virtuals: true },
  }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

orderSchema.virtual("orderTotal").get(function () {
  return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual("totalQty").get(function () {
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});

module.exports = mongoose.model("Order", orderSchema);
