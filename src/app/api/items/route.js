import { validateItemData } from "@/app/utils/apiHelpers";
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

    //TODO: Validering av data här
    const [hasErrors, errors] = validateItemData(body);
    if(hasErrors) {
        return NextResponse.json({
            message: "Validation errors: " + errors
        }, {
            status: 400
        })
    }

    let newItem;
    try {
        newItem = await prisma.item.create({
            data: {
                name: body.name,
                description: body.description,
                quantity: Number(body.quantity),
                category: body.category
            }
        })
    } catch (error) {
        console.log(error.message)
        return NextResponse.json(
            {
                message: "Invalid data sent for item creation"
            }, 
            {
                status: 400
            }
        );
    }
    
    return NextResponse.json(newItem, {
        status: 201
    });

}





