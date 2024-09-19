import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateItemData } from "@/app/utils/apiHelpers";

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

    //TODO? kolla vilken användare som gör requesten?
    // const userId = req.headers.get('userId')
    // console.log("User making the req: ", userId)

    //validering
    // const [hasErrors, errors] = validateItemData(body);
    // if(hasErrors) {
    //     return NextResponse.json({
    //         message: "validation errors: ", errors
    //     }, {
    //         status: 400
    //     })
    // }


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

        return NextResponse.json(updatedItem)
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
        await prisma.item.delete({
            where: { id: Number(id) }
        })
        return new Response(null, {
            status: 204
        })
    } catch(error) {
        console.log("error", error)
        return NextResponse.json(error) //TODO: det här ska egentligen vara en object 404 response, men den ska länkas in. fixa senare
    }
}