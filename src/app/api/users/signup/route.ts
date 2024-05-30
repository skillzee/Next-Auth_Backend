import { connectDb } from "@/dbConnect/dbConnect";
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

connectDb();

export async function POST(req: NextRequest){
    try {
        const reqBody =await req.json() //Treat this as a promise
        const {username, email, password} = reqBody
        //Validation
        console.log(reqBody);

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({
                error: "User Already Exists"
            },
            {
                status: 400
            }
        )
        }


        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);


        // Send Verification Mail
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({
            success:false,
            error: error.message
        }, {status:500}
    )
        
    }
}