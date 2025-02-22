"use client";
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";

export function CreationSubmit(){
    const { pending } = useFormStatus();
    return (
        <>
        {pending ? (
            <Button disabled>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please Wait 
            </Button>

        ):(
            <Button size="lg">
                 Next
            </Button>
        )}
        </>
    )
}