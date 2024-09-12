//Importera saker
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { signJWT } from "@/app/utils/authHelpers";

const prisma = new PrismaClient();

//POST function
export async function POST(req){
    console.log("POST request attempted on /register/")
    let body;
    try {
        body = await req.json();
        console.log("body is: " , body)
        if(!body.email || !body.password || !body.name){
            throw new Error();
        }
    } catch (error){
        return NextResponse.json(
            {
                message: "A valid user object has to be sent" + error,
            }, 
            {
                status: 400,
            }
        );
    }

    // const userId = req.headers.get('userId');
    // console.log("User making the req: ", userId); //obs detta måste konfigureras mer senare mha localstorage

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            }
        })

        console.log("New user has been registered: " + user)

        const token = await signJWT({
            userId: user.id
        })

        return NextResponse.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        })
    }    

}
