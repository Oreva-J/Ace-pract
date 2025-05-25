import mongoose from "mongoose";

// This code defines a Mongoose schema for an order in ACE Pharmacy e-commerce application.
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    items: [{
        product:{ type: string, required: true,ref: 'Product' },
        quantity: { type: Number, required:true },
    }],
    
    address: {
        type: String,
        required: true,
        ref: 'Address',
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
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;