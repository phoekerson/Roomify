"use client"
import Image from "next/image"
import { categoryItems } from "../lib/categorytems"
import { Card, CardHeader } from "@/components/ui/card"
import { useState } from "react"
export function SelectedCategorie(){
    const [SelectedCategorie, setSelectedCategorie] = useState<string | undefined>(
        undefined
    );
    return (
        <div className="grid grid-cols-4 gap-8 mt-18 w-3/5 mx-auto">
           
            <input type="hidden" name="categoryName" value={SelectedCategorie as string} />
            {categoryItems.map((item) => (
                <div key={item.id} className="cursor-pointer">
                    <Card 
                        className={SelectedCategorie === item.name ? "border-primary" : ""}
                        onClick={()=> setSelectedCategorie(item.name)}>
                        <CardHeader>
                            <Image 
                            src={item.imageUrl}
                            alt={item.name}
                            height={32}
                            width={32}
                            className="w-8 h-8"
                            />
                            <h3 className="font-medium"> {item.title} </h3>
                        </CardHeader>
                    </Card>
                </div>
            )
            
            )}
        </div>

    )
}