import Head from "next/head"
import Sidebar from "@/components/Sidebar"
import DefaultAvatar from "@/components/DefaultAvatar"
import axios from "axios"
import dynamic from "next/dynamic"

import { BsBroadcast } from "react-icons/bs"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { abbrNum, timeDifference } from "@/util/utils"
import { useState } from "react"

export const FlvNextPlayer = dynamic(
    () => import("react-flv-player/build/wrapper/ReactFlvPlayer"),
    {
        ssr: false,
    }
)

export default function Stream(props) {
    const [followed, setFollowed] = useState(props.isFollowed)
    const router = useRouter()

    const follow = async (e) => {
        let token = getCookie('token')
        if(!token) {
            router.push('/login')
            return
        }

        if(followed) {
            let res = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/accounts/unfollow', {
                username: router.query.username,
                token
            })
    
            if(res.data.success) {
                setFollowed(!followed)
            }
        } else {
            let res = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/accounts/follow', {
                username: router.query.username,
                token
            })
    
            if(res.data.success) {
                setFollowed(!followed)
            }
        }
    }

    return (
        <>
            <Head>
                <title>{`${props.username} - Flowee`}</title>
            </Head>
            <Sidebar />
            <main className="flex flex-col md:mt-[80px] md:ml-[150px]">
                {props.isStreaming
                ? (
                    <div className="max-w-[1300px] md:mr-10">
                        <FlvNextPlayer
                            url={props.streamURL}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center max-w-[1300px] h-[300px] bg-gray-800 md:rounded-md md:mr-10">
                        <span className="text-[25px]">User is offline</span>
                    </div>
                )
                }
                <div className="flex flex-col mt-3">
                    <div className="flex flex-col ml-2">
                        <span className="text-[20px] font-bold">{props.streamName}</span>
                        {props.isStreaming
                        ? <span>{props.views} views • Started {timeDifference(props.lastStream)}</span>
                        : <span>Last stream was {timeDifference(props.lastStream)}</span>}
                    </div>
                    
                    <div className="flex gap-7 bg-[#9c68b0] rounded-l-[50px] md:rounded-r-[15px] max-w-[500px] mt-5">
                        {props.avatar == 'default'
						? <DefaultAvatar size="60" username={props.username} font="25" />
						: <img src={props.avatar} className="rounded-full unselectable border-[5px] border-[#70676a]" width="60" alt="Avatar" />}
                        <div className="flex flex-col text-center">
                            <span className="text-[20px] font-semibold">{props.username}</span>
                            <span className="flex gap-2">
                                {props.isStreaming
                                ? (
                                    <>
                                        <BsBroadcast className="text-[25px]" /> LIVE
                                    </>
                                ) : (
                                    <>
                                        {props.lastStream == 0
                                        ? <span>Never streamed</span>
                                        : timeDifference(props.lastStream)}
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="ml-auto flex gap-3 items-center pr-3">
                            <span className="font-medium">{abbrNum(props.followers, 1)} follower{props.followers > 1 || props.followers == 0 && 's'}</span>
                            {!props.isYou
                            && <button onClick={follow}>{followed ? 'Unfollow' : 'Follow'}</button>}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(ctx) {
    let username = ctx.params.username
    let token = ctx.req.cookies.token

    let res = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/accounts/getInfo?username=' + username + (token && '&token=' + token))

    if(!res.data.success && res.data.errorCode == -1) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

    return {
        props: res.data
    }
}