import { Listing } from "../components/listing";
import { NoItems } from "../components/NoItem";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData(userId: string) {
    const data = await prisma.reservation.findMany({
        where:{
            userId: userId
        },
            select:{
                Home:{
                    select:{
                        id:true,
                        country:true,
                        photo:true,
                        description: true,
                        price:true,
                        Favorite:{
                            where:{
                                userId: userId,
                            },
                        },
                    },
                },
            },
    });
    return data;
}
export default async function ReservationsRoute(){
    const {getUser} = getKindeServerSession();
    const user = await getUser()
    if(!user?.id) return redirect("/");
    const data = await getData(user?.id)
    return(
        <section className="container mx-auto px-5 lg:px-10 mt-10">
        <h2 className="text-3xl font-semibold tracking-tight"
        > Your reservations</h2>

        {data.length === 0 ? (
            <NoItems title="You dont't have any favorites" description="Please add favorite to see them here"/>
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
                        favoriteId = {item.Home?.Favorite[0]?.id as string}
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