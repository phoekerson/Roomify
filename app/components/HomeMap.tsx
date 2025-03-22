import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export function HomeMap({locationValue}: {locationValue: string | null | undefined}){
    const actualValue = locationValue || "";
    const LazyMap = dynamic(() => import ("@/app/components/Map"), {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full"/>
    });
    return <LazyMap locationValue={actualValue}/>;
} 