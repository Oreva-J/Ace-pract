import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";


export async function GET(request) {
    try { 
        // Connect to the database
        await connectDB();
        // Fetch all products
        const products = await Product.find({})
        return NextResponse.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ success: false, message: error.message || "Failed to fetch products" });
        
    }
}