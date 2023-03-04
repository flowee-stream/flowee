import Head from "next/head"
import Sidebar from "@/components/Sidebar"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import { setCookie } from "cookies-next"

export default function Login() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const formSubmitted = async (e) => {
        e.preventDefault()

        let error = document.getElementById('error')

        // pre-request error handling
        if(!/^[a-zA-Z0-9-_]*$/.test(formData.username)) {
            error.innerText = 'Username must contain only English alphanumeric characters'
            return
        }

        let res = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/accounts/login', formData)
        
        if(res.data.success) {
            setCookie('token', res.data.token, {expires: new Date(new Date().setDate(new Date().getDate() + 30))})
            router.push('/' + formData.username)
        } else {
            switch(res.data.errorCode) {
                case -1:
                    error.innerText = 'Failed to login'
                    break

                default:
                    error.innerText = 'Failed to fetch data'
                    break
            }
        }
    }

    return (
        <>
            <Head>
                <title>Login - Flowee</title>
            </Head>
            <Sidebar />
            <main className="h-screen flex items-center justify-center md:justify-start md:ml-[150px]">
                <div className="flex flex-col items-center bg-white w-[400px] py-5 md:rounded-md">
                    <span className="text-gray-800 text-[25px] font-semibold">Welcome back 👋</span>
                    <span id="error" className="text-gray-800 mt-3 text-center px-5"></span>
                    <form className="flex flex-col gap-2 mt-3" onSubmit={formSubmitted}>
                        <input type="text" name="username" placeholder="Username" onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }} required />
                        <input type="password" name="password" placeholder="Password" onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} required />
                        <button className="mt-3">Login</button>
                    </form>
                </div>
            </main>
        </>
    )
}