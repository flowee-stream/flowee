import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import { getCookie } from "cookies-next"
import DefaultAvatar from "./DefaultAvatar"

import { BsPersonCircle, BsFillGearFill } from "react-icons/bs"

export default function Sidebar() {
    const [userData, setUserData] = useState({
        isLoggedIn: false,
        username: null,
        avatar: null
    })

    useEffect(() => {
        let token = getCookie('token')
        if(!token) return

        axios.post(process.env.NEXT_PUBLIC_API_HOST + '/accounts/verify', {
            token
        }).then(res => {
            if(!res.data.success) return

            setUserData({
                isLoggedIn: true,
                username: res.data.username,
                avatar: res.data.avatar
            })
        })
    }, [])

    return (
        <nav className="px-5 w-screen py-5 flex md:px-0 md:flex-col justify-between items-center md:fixed md:h-screen md:top-0 md:left-0 md:w-[80px] bg-[#262626]">
            <a href="/"><Image src="/assets/flowee.svg" sizes="55" width="55" height="0" alt="Flowee" className="w-14 h-auto transition-[width] unselectable hover:w-16" /></a>
            <div className="flex md:flex-col md:mb-5 items-center gap-4">
                {userData.isLoggedIn
                ? (
                    <>
                        <Link href="/settings" className="text-[30px] transition-opacity hover:opacity-80"><BsFillGearFill /></Link>
                        <Link href={`/${userData.username}`} className="text-[30px] transition-opacity hover:opacity-80">
                            {userData.avatar == 'default'
                            ? <DefaultAvatar size="40" font="20" username={userData.username} />
                            : <img src={userData.avatar} width="40" height="40" className="rounded-full unselectable" />}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="hover:underline">Login</Link>
                        <Link href="/register" className="hover:underline">Register</Link>
                    </>
                )
                }
            </div>
        </nav>
    )
}