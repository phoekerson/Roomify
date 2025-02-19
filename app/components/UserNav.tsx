import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function UserNav(){
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5"/>
                    <img 
                        src="https://www.vecteezy.com/vector-art/9292244-default-avatar-icon-vector-of-social-media-user.jpg"
                        alt="image of the user by default"
                        className="rounded-full h-8 w-8 hidden lg:block"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {user ? (
                    <>
                            <DropdownMenuItem>
                                    <LoginLink className="w-full">Logout</LoginLink>
                            </DropdownMenuItem>
                    </>
                ): (
                    <>
                <DropdownMenuItem>
                    <RegisterLink className="w-full">Register</RegisterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                        <LoginLink className="w-full">Login</LoginLink>
                </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}