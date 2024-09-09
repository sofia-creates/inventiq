import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req){
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    let items = [];
    if(search) {
        items = await prisma.item.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        })
    } else {
        items = await prisma.item.findMany();
    }

    return NextResponse.json(items);

};


export async function POST(req){
    let body;
    try {
        body = await req.json();
    } catch (error){
        return NextResponse.json(
            {
                message: "A valid JSON object has to be sent" + error,
            }, 
            {
                status: 400,
            }
        );
    }


    // ev en check av vilken användare som gör detta
    // const userId = req.headers.get('userId');
    // console.log("User making the req: ", userId);

    //TODO: Validering av data här

    let newItem;
    try {
        newItem = await prisma.item.create({
            data: {
                name: body.name
            }
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json(
            {
                message: "Invalid data sent for book creation"
            }
        )
    }
    

}





