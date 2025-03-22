import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItem";
import { Listing } from "../components/listing";
import { unstable_noStore as noStore } from "next/cache";

// Définir le type de retour de la fonction getData
type FavoriteData = {
    Home: {
        photo: string | null;
        id: string;
        Favorite: {
            id: string;
        }[];
        price: number;
        country: string;
        description: string;
    } | null;
}

async function getData(userId: string) {
    noStore();
    const data = await prisma.favorite.findMany({
        where: {
            userId: userId,
        },
        select: {
            Home: {
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

    return data as FavoriteData[];
}

export default async function FavoriteRoute() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) return redirect("/");
    
    const data = await getData(user.id);
    
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">
                Your favorites
            </h2>

            {data.length === 0 ? (
                <NoItems 
                    title="You don't have any favorites" 
                    description="Please add favorite to see them here"
                />
            ) : (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
                    {data.map((item: FavoriteData) => {
                        // S'assurer que Home existe avant de l'utiliser
                        if (!item.Home) return null;
                        
                        return (
                            <Listing
                                key={item.Home.id}
                                description={item.Home.description}
                                location={item.Home.country}
                                pathName="/favorites"
                                homeId={item.Home.id}
                                imagePath={item.Home.photo ?? ""}
                                price={item.Home.price}
                                userId={user.id}
                                favoriteId={item.Home.Favorite[0]?.id ?? ""}
                                isInFavoriteList={item.Home.Favorite.length > 0}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}