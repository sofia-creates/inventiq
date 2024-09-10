//EVentuellt så kanske allting här ska vara i register/route.js

// Importera saker
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//GET funktion
export async function GET(req){
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    let users = [];
    if(search) {
        users = await prisma.users.findMany({
            where: {
                title: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        })
    } else {
        items = await prisma.users.findMany();
    }

    return NextResponse.json(items);

};


//exportera












