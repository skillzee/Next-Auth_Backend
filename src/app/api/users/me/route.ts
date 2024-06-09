import { connectDb } from "@/dbConnect/dbConnect";
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import { getDataFromToken } from "@/helpers/getDataFromToken";


connectDb();


export async function POST(request: NextRequest) {
    try {
        // Extract data from token
        const userId = await getDataFromToken(request)
        const user = User.findOne({_id: userId}).select("-password")

        return NextResponse.json({
            message: "User Found",
            data: user
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error in me route"
        })
    }
}