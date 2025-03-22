import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";
export async function GET(){
    noStore();
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user || user===null || !user.id){
        throw new Error("Something went wrong, i'm sorry, please try again")
    } 
    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if(!dbUser){
        dbUser = await prisma.user.create({
            data: {
                email: user.email ?? "",
                firstname: user.given_name ?? "",
                lastname: user.family_name ?? "",
                id:user.id,
                profileImage:
                    user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
            }
        });
    }
    return NextResponse.redirect("https://roomify-one.vercel.app");
}