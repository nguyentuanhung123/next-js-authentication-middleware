"use server"

import bcryptjs from 'bcryptjs'
import connectToDB from "@/database"
import User from '@/models';

export async function registerUserAction(formData) {
    await connectToDB();

    try { 
        const { userName, email, password } = formData;

        const checkUser = await User.findOne({email});
        if(checkUser) {
            return {
                success: false,
                message: 'User already exists ! Please try with diffirent email',
            };
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newlyCreated = new User({
            userName, 
            email, 
            password: hashedPassword
        });

        const savedUser = await newlyCreated.save()
        if(savedUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(savedUser))
            }
        } else {
            return {
                success: false,
                message: 'Something went wrong! Please try again later.'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Something error occured',
        }
    }
}