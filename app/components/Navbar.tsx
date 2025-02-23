import Link from "next/link"
import Image from "next/image"
import Desktoplogo from "@/app/assets/images/desktop_logo.png"
import phonelogo from "@/app/assets/images/phone_logo.png"
import { UserNav } from "./UserNav"
export function Navbar(){
    return(
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href={"/"}>
                    <Image src={Desktoplogo} alt="Desktop Logo" className="w-32 hidden lg:block"/>
                    <Image src={phonelogo} alt="phone_logo" className="block lg:hidden w-12"/>
                </Link>
                <div className="rounded-full border px-5 py-2">
                    <h1>Search</h1>
                </div>
                <UserNav/>
            </div>
        </nav>
    )
}