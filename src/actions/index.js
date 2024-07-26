"use server"

import connectToDB from "@/database";
import User from '@/models';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

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

export async function loginUserAction(formData) {
    await connectToDB();
    try {
        const { email, password } = formData;

        //check if user exist in DB
        const checkUser = await User.findOne({email})
        if(!checkUser) {
            return {
                success: false,
                message: 'User does not exist! Please sign up'
            }
        }

        // check if password is valid or not
        const checkPassword = await bcryptjs.compare(password, checkUser.password)
        if(!checkPassword) {
            return {
                success: false,
                message: 'Password is incorrect please check' 
            }
        }

        // create token
        const createdTokenData = {
            id: checkUser._id,
            userName: checkUser.userName,
            email: checkUser.email
        }

        const token = jwt.sign(createdTokenData, "DEFAULT_KEY", { expiresIn: '1d' })

        // store token using next/headers
        const getCookies = cookies();
        getCookies.set('token', token)

        return {
            success: true,
            message: 'Login is successfull'
        }

    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong! Please try again.'
        }
    }
}

export async function fetchAuthUserAction() {
    await connectToDB();
    try {
        // get token on cookies
        const getCookies = cookies();
        const token = getCookies.get("token")?.value || ""
        if(token === "") {
            return {
                success: false,
                message: 'Token is invalid.'
            };
        }

        const decodedToken = jwt.verify(token, 'DEFAULT_KEY');
        const getUserInfo = await User.findOne({ _id:  decodedToken.id})

        if(getUserInfo) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(getUserInfo))
            }
        } else {
            return {
                success: false,
                message: 'Some error occured! Please try again'
            }
        }
    }
    catch(error) {
        console.log(error);
        return {
            success: false,
            message: 'Something went wrong! Please try again.'
        }
    }
}