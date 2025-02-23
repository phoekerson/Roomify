import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "@/app/components/Counter";
import { CreationSubmit } from "@/app/components/SubmitButtons";
import { CreationBottom } from "@/app/components/CreationBottomBar";
import { CreateDescription } from "@/app/actions";
export default function DescriptionPage({params,
            }: {params: 
                {id: string}}){
    return (
        <>
        <div className="w-3/5 mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight transition-colors"></h2>
            Please describe your hotel as good as you can
        </div>
        <form action={CreateDescription}>
            <input type="hidden" name="homeId" value={params.id}/>
            <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-6 mb-36">
                <div className="flex flex-col gap-y-2">
                    <Label>
                    Title
                    </Label>
                    <Input name="title" required placeholder="Short and simple"/>
                </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Description</Label>
                        <Textarea required name="description" placeholder="Please describe the hotel or the room"/>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label>Price</Label>
                        <Input name="price" type="number" required placeholder="Price per Night in USD" min={10}/>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Label>Image</Label>
                        <Input name="image" type="file" required/>
                    </div>

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
            </div>
            <CreationBottom/>
        </form>
    </>
    )
}