import mongoose from "mongoose";

// This code defines a Mongoose schema for an order in ACE Pharmacy e-commerce application.
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'user',
    },
    items: [{
        product:{ type: String, required: true, ref: 'product' },
        quantity: { type: Number, required:true }
    }],
    
    address: {
        type: String,
        required: true,
        ref: 'address',
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'Order Placed',
    },
    date: {
        type: Number,
        required: true,
    }
});
const Order = mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;