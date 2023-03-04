import Link from "next/link"
import Image from "next/image"

import { BsPersonCircle, BsFillGearFill } from "react-icons/bs"

export default function Sidebar() {
    return (
        <nav className="flex flex-col gap-3 items-center fixed h-screen top-0 left-0 w-[80px] bg-[#262626]">
            <a href="/"><Image src="/assets/flowee.svg" sizes="55" width="55" height="0" alt="Flowee" className="mt-5 w-14 h-auto transition-[width] unselectable hover:w-16" /></a>
            <div className="flex flex-col mb-5 items-center gap-4 mt-auto">
                {/* <a href="/settings" className="text-[30px] transition-opacity hover:opacity-80"><BsFillGearFill /></a>
                <a href="/myst" className="text-[30px] transition-opacity hover:opacity-80"><BsPersonCircle /></a> */}
                <Link href="/login" className="hover:underline">Login</Link>
                <Link href="/register" className="hover:underline">Register</Link>
            </div>
        </nav>
    )
}