import Head from "next/head"
import Sidebar from "@/components/Sidebar"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import { setCookie } from "cookies-next"

export default function Login() {
    const router = useRouter()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        captcha: null
    })

    const captchaVerify = (token) => {
        if(!token) return
        setFormData({
            ...formData,
            captcha: token
        })
    }

    const formSubmitted = async (e) => {
        e.preventDefault()

        if(!formData.captcha) return

        let error = document.getElementById('error')
        error.innerText = ''

        // pre-request error handling
        if(!/^[a-zA-Z0-9-_]*$/.test(formData.username)) {
            error.innerText = 'Username must contain only English alphanumeric characters'
            return
        }
        if(formData.username.length < 3 || formData.username.length > 15) {
            error.innerText = 'Username must be less than 15 symbols and more than 3 symbols'
            return
        }

        let res = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/accounts/register', formData)
        
        if(res.data.success) {
            setCookie('token', res.data.token, {expires: new Date(new Date().setDate(new Date().getDate() + 30))})
            router.push('/' + formData.username)
        } else {
            window.hcaptcha.reset()
            setFormData({ ...formData, captcha: null })

            switch(res.data.errorCode) {
                case -1:
                    error.innerText = 'Username must contain only English alphanumeric characters'
                    break
                case -2:
                    error.innerText = 'Username must be less than 15 symbols and more than 3 symbols'
                    break
                case -3:
                    error.innerText = 'This username was already taken'
                    break
                case -4:
                    error.innerText = 'Failed to verify captcha, please try again'
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
                <title>Register - Flowee</title>
            </Head>
            <Sidebar />
            <main className="h-screen flex items-center justify-center md:justify-start md:ml-[150px]">
                <div className="flex flex-col items-center bg-white w-[400px] py-5 md:rounded-md">
                    <span className="text-gray-800 text-[25px] font-semibold">Welcome to Flowee 👋</span>
                    <span id="error" className="text-gray-800 mt-3 text-center px-5"></span>
                    <form className="flex flex-col gap-2 mt-3" onSubmit={formSubmitted}>
                        <input type="text" name="username" placeholder="Username" onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }} required />
                        <input type="password" name="password" placeholder="Password" onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} required />
                        <HCaptcha
                            sitekey={process.env.NEXT_PUBLIC_PRODUCTION == '1' ? process.env.NEXT_PUBLIC_CAPTCHA_SITEKEY : '10000000-ffff-ffff-ffff-000000000001'}
                            onVerify={captchaVerify}
                            theme="dark"
                        />
                        <button className="mt-3">Register</button>
                    </form>
                </div>
            </main>
        </>
    )
}