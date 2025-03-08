import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItem";
import { Listing } from "../components/listing";
async function getData(userId: string){
    const data = await prisma.favorite.findMany({
        where:{
            userId: userId,
        },
        select:{
            Home:{
                select: {
                    photo: true,
                    id: true,
                    Favorite: true,
                    price: true,
                    country: true,
                    description: true,
                },
            },
        },
    });

    return data;
}



export default async function FavoriteRoute(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user) return redirect("/");
    const data = await getData(user.id)
    return (
       <section className="container mx-auto py-5 lg:py-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight"
        > Your favorites</h2>

        {data.length === 0 ? (
            <NoItems/>
        ) : (
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                {data.map((item) => (
                    <Listing
                        key={item.Home?.id}
                        description={item.Home?.description as string}
                        location={item.Home?.country as string}
                        pathName = "/favorites"
                        homeId = {item.Home?.id as string}
                        imagePath = {item.Home?.photo as string}
                        price = {item.Home?.price as number}
                        userId = {user.id}
                        favoriteId = {item.Home?.Favorite[0].id as string}
                        isInFavoriteList = {
                            (item.Home?.Favorite.length as number) > 0 ? true : false
                        }
                    />
                ))}
            </div>
        )
    }
       </section>
    )
}