// Importera saker
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// import { signJWT } from "@/utils/authHelpers";
import { signJWT } from "@/app/utils/authHelpers";

const prisma = new PrismaClient();

// Man använder en POST request för att logga in, inte en GET request

export async function POST(req) {
    let body;

    try {
        body = await req.json();
        console.log(body);
        if(!body.email || !body.password){
            throw new Error()
        }
    } catch (error) {
        return NextResponse.json(
            {
                message: "A valid user object has to be provided."
            }, {
                status: 400
            }
        );
    }

    try{
        const user = await prisma.user.findUnique({ //hitta en användare som har detta email som anges i body
            where: {
                email: body.email
            }
        })

        if(!user || user.password !== body.password){ //kollar 1. om det hittades en användare till user ovan och 2 om den användarens password stämmer
            throw new Error("Invalid login credentials")
        }

        const token = await signJWT({
            userId: user.id
        })

        return NextResponse.json({
            user,
            token
        })
    } catch(error){
        console.log(error);
        return NextResponse.json({
            error: error.message
        }, {
            status: 400
        })
    }
}

