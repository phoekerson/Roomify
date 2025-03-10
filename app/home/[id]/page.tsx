import prisma from "@/app/lib/db"
import { useCountries } from "@/app/lib/getCountries";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

async function getData(homeId: string){
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
                select:{
                    profileImage: true,
                    firstname:true,
                }
            }
        },
    });

    return data;
}

export default async function Home({params,}:{params:{id: string}}){
    const data = await getData(params.id);
    const {getCountryByValue} = useCountries();
    const country = getCountryByValue(data?.country as string)

    return (
        <div className="w-[75%] mx-auto mt-10">
            <h1 className="font-medium text-2xl mb-5">
                {data?.title}
            </h1>
            <div className="relative h-[550px]">
            <Image 
                alt="Image of the Hotel"
                src={`https://uxkrtixbwhqoyvwnmbnj.supabase.co/storage/v1/object/public/image/${data?.photo}`}
                fill
                className="rounded-lg full object-cover w-full"
            />
            </div>

            <div className="flex justify-between gap-x-24 mt-8">
                <div className="w-2/3 font-medium">
                    <h3> {country?.flag} {country?.label} / {country?.region}</h3>
                    <div className="flex gap-x-2 text-muted-foreground">
                        <p> {data?.guests} Guests </p> * <p> {data?.bedrooms} Bedrooms </p> * {" "} {data?.bathrooms} Bathrooms
                    </div>

                    <div className=" flex items-center mt-6 rounded-lg">
                        <img src={data?.User?.profileImage ?? 
                        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        }  alt="User image"
                        className="w-11 h-11 rounded-full"
                    />
                        <div className="flex flex-col ml-4">
                            <h3 className="font-medium"> Hosted by {data?.User?.firstname} </h3>
                            <p className="text-sm text-muted-foreground"> Since </p>
                        </div>
                    </div>

                    <Separator className="my-7"/>
                </div>
            </div>
        
        </div>
    )
}