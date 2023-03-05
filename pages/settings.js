import Head from "next/head"
import Sidebar from "@/components/Sidebar"
import axios from "axios"

export default function Settings(props) {
    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <Sidebar />
            <main className="mt-5 md:mt-[80px] md:ml-[150px]">
                <div className="flex flex-col items-center md:items-start gap-3">
                    <span className="text-[30px] font-medium">Stream</span>
                    <span>Your stream token:</span>
                    <code id="tokenField" className="p-3 bg-gray-600 md:mr-10 md:rounded-md">{props.streamToken}</code>
                    <span>Use it in your streaming software settings</span>
                    <span><b>Never</b> share it to anyone, <b>everyone</b> who has this token can do streams <b>as you</b>!</span>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(ctx) {
    let token = ctx.req.cookies.token

    if(!token) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }

    let res = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/settings/getSettings?token=' + token)

    if(!res.data.success) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            }
        }
    }

    return {
        props: res.data
    }
}