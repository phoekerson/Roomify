"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Search } from "lucide-react"
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";
export function SearchModalComponent(){

    const [step, setStep] = useState(1);
    const [locationValue, setLocationValue] = useState("")
    const {getAllCountries} = useCountries()
    function SubmitButtonLocal(){
        if(step === 1){
            return (<Button onClick={()=> setStep(step + 1)} type="button"
            >Next</Button>
            )
        } else if(step === 2){
            return <CreationSubmit/>;
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full py-2 px-5 border flex items-center cursos-pointer">
                    <div className="flex h-full divide-x font-medium">
                        <p className="px-4"> Anywhere </p>
                        <p className="px-4"> Any Week </p>
                        <p className="px-4">Add Guests </p>
                    </div>
                    <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full"/>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425]">
                <form className="gap-4 flex flex-col">
                    <input type="hidden" name="country" value={locationValue}/>
                    {step === 1 ?(
                        <>
                        <DialogHeader>
                            <DialogTitle>Select a country</DialogTitle>
                            <DialogDescription> Please choose a Country, so that what you want </DialogDescription>
                        </DialogHeader>

                        <Select required onValueChange={(value) => setLocationValue(value)} value={locationValue}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Countries</SelectLabel>
                                {getAllCountries().map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                    {item.flag} {item.label} / {item.region}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <HomeMap locationValue=""/>
                        </>

                    ):(
                        <>
                         <DialogHeader>
                            <DialogTitle>Select all the info you need</DialogTitle>
                            <DialogDescription> Please choose a Country, so that what you want </DialogDescription>
                        </DialogHeader>
                        <Card>
                        <CardHeader className="flex flex-col gap-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">Guests</h3>
                                    <p className="text-muted-foreground text-sm"> How many guests do you want ?</p>
                                </div>
                                <Counter name="guest"/>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">Rooms</h3>
                                    <p className="text-muted-foreground text-sm"> How many Rooms do you want ?</p>
                                </div>
                                <Counter name="room"/>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="underline font-medium">Bathroom</h3>
                                    <p className="text-muted-foreground text-sm"> How many Bathrooms do you want ?</p>
                                </div>
                                <Counter name="bathroom"/>
                            </div>
                        </CardHeader>
                    </Card>

                        </>
                    )}

                    <DialogFooter>
                        <SubmitButtonLocal/>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}