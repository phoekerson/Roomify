import { SelectedCategorie } from "@/app/components/SelectedCategorie"
import { Button } from "@/components/ui/button"
import { CreationSubmit } from "@/app/components/SubmitButtons"
import Link from "next/link"
import { createCategoryPage } from "@/app/actions"
export default function StructureRoute({params}: {params: {id: string}}){
    return (
        <>
        <div className="w-3/5 mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight transition-colors">
                Which of these best describe your Home?
            </h2>
        </div>
        <form action={createCategoryPage}>
            <input type="hidden" name="homeId" value={params.id}/>
            <SelectedCategorie/>
            <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
                <div className="flex items-center justify-between mx-auto px-5 lg:px-20 h-full">
                    <Button variant="secondary" size="lg">
                        <Link href="/">
                        Cancel
                        </Link>
                    </Button>
                    <CreationSubmit/>
                </div>
            </div>
        </form>
        </>
    )
}