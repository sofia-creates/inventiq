import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function GET(req, options) {
    const id = options.params.id;

    try {
        const item = await prisma.item.findUniqueOrThrow({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json(item);
    } catch(error){
        console.log(error)
        return NextResponse.json(error) //TODO: det här ska egentligen vara en object 404 response, men den ska länkas in. fixa senare
    }
}


export async function PUT(req, options) {
    const id = options.params.id;

    let body;

    try{
        body = await req.json()
    } catch(error) {
        return NextResponse.json({
            message: "A valid JSON object has to be sent"
        }, {
            status: 400
        })
    }

    //TODO validering här


    try {
        const updatedItem = await prisma.item.update({
            where: {
                id: Number(id)
            },
            data: {
                name: body.name, // undersök att använda optional här? ifall uppdateringen inte ska ändra alla värden?
                description: body.description,
                quantity: body.quantity,
                category: body.category
            }      
        })

        return NextResponse.json(updatedBook)
    } catch(error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}


export async function DELETE(req, options) {
    const id = options.params.id

    try{
        await prisma.book.delete({
            where: { id: Number(id) }
        })
        return new Response(null, {
            status: 204
        })
    } catch(error) {
        return NextResponse.json(error) //TODO: det här ska egentligen vara en object 404 response, men den ska länkas in. fixa senare
    }
}