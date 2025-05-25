import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        console.log('you trigerrrr me');
        
        const { userId } = getAuth(request);
        const { cartData } = await request.json();

        await connectDB();
        const user = await User.findById(userId);
    
        // Update the user's cart items
        user.cartItems = cartData;
        await user.save();
        console.log("cart update sent", user.cartItems);
        
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message || "Failed to update cart" });
    }
    
}