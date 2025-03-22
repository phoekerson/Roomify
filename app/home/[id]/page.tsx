import { CategoryShowCase } from "@/app/components/CategoryShowCase";
import { HomeMap } from "@/app/components/HomeMap";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import prisma from "@/app/lib/db";
import { getCountryByValue } from "@/app/lib/getCountries";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createReservation } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import { ReservationSubmitButton } from "@/app/components/SubmitButtons";
import { unstable_noStore as noStore } from "next/cache";

async function getData(homeId: string) {
    noStore();
    const data = await prisma.home.findUnique({
        where: {
            id: homeId,
        },
        select: {
            photo: true,
            description: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            title: true,
            categoryName: true,
            price: true,
            country: true,
            User: {
                select: {
                    profileImage: true,
                    firstname: true,
                }
            }
        },
    });

    return data;
}

export default async function Home({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    
    if (!data) {
        return <div className="w-[75%] mx-auto mt-10">Ce logement n existe pas ou a été supprimé.</div>;
    }
    
    const country = data.country ? getCountryByValue(data.country) : null;
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    return (
        <div className="w-[75%] mx-auto mt-10 mb-12">
            <h1 className="font-medium text-2xl mb-5">{data.title}</h1>

            <div className="relative h-[550px]">
                <Image 
                    alt="Image of the Hotel"
                    src={`https://uxkrtixbwhqoyvwnmbnj.supabase.co/storage/v1/object/public/image/${data.photo}`}
                    fill
                    className="rounded-lg object-cover w-full"
                />
            </div>

            <div className="flex justify-between gap-x-24 mt-8">
                <div className="w-2/3 font-medium">
                    <h3>
                        {country && (
                            <>
                                {country.flag && <span>{country.flag} </span>}
                                {country.region && <span>/ {country.region}</span>}
                            </>
                        )}
                    </h3>
                    <div className="flex gap-x-2 text-muted-foreground">
                        <p>{data.guests} Guests</p> * <p>{data.bedrooms} Bedrooms</p> * {data.bathrooms} Bathrooms
                    </div>

                    <div className="flex items-center mt-6 rounded-lg">
                        <img 
                            src={data.User?.profileImage ?? 
                            "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                            }
                            alt="User image"
                            className="w-11 h-11 rounded-full"
                        />
                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium">
                                {data.User?.firstname && (
                                    <>Hosted by {data.User?.firstname ?? "Hebergeur inconnu"}</>
                                )}
                            </h3>
                            <p className="text-sm text-muted-foreground">Host</p>
                        </div>
                    </div>

                    <Separator className="my-7"/>

                    <CategoryShowCase categoryName={data.categoryName}/>

                    <Separator className="my-7"/>

                    <p className="text-muted-foreground">{data.description}</p>

                    <Separator className="my-7"/>

                    <HomeMap locationValue={country && country.value ? country.value : ""}/>
                </div>

                <form action={createReservation}>
                    <input type="hidden" name="homeId" value={params.id}/>
                    <input type="hidden" name="userId" value={user?.id ?? ""}/>

                    <SelectCalendar/>
                    
                    {user?.id ? (
                        <ReservationSubmitButton/>
                    ) : (
                        <Button className="w-full" asChild>
                            <Link href="/api/auth/login">
                                Make the reservation
                            </Link>
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
}
