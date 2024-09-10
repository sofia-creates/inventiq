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