import Head from "next/head"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"

import { BsBroadcast, BsPeopleFill } from "react-icons/bs"
import axios from "axios"
import { timeDifference } from "@/util/utils"
import DefaultAvatar from "@/components/DefaultAvatar"

export default function Home(props) {
	return (
		<>
			<Head>
				<meta property="og:title" content="Flowee" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://flowee.ru" />
                <meta property="og:description" content="Flowee is an open-source streaming platform built for people" />
                <meta name="theme-color" content="#DA3DFF" />
				<title>Flowee</title>
			</Head>
			<Sidebar />
			<main className="ml-[20px] md:ml-[150px] mt-[50px]">
				<div className="flex flex-col">
					<span className="font-bold text-[40px]">Welcome home</span>
					<span className="font-semibold text-[25px]">Flowee is an open-source streaming platform built for people</span>
					<div className="flex gap-3 mt-5">
						<a href="https://github.com/flowee-stream"><button className="bg-black">GitHub</button></a>
						<a href="https://t.me/flowee_stream"><button className="bg-[#0088cc]">Telegram</button></a>
					</div>
				</div>

				<div className="flex items-center gap-3 mt-12 font-bold text-[20px] py-5">
					<BsBroadcast className="text-[25px]" />
					<span className="text-[23px] unselectable">LIVE</span>
				</div>
				<div className="flex flex-wrap gap-5">
					{props.live.length == 0
					? <span>No one is streaming right now</span>
					: props.live.map(user => {
							return (
								<Link key={user.id} className="flex gap-7 bg-[#9c68b0] rounded-l-[50px] rounded-r-[15px] pr-5 transition-opacity hover:opacity-80" href={`/${user.username}`}>
									{user.avatar == 'default'
									? <DefaultAvatar size="60" username={user.username} font="25" />
									: <img src={user.avatar} className="rounded-full unselectable border-[5px] border-[#70676a]" width="60" alt="Avatar" />}
									<div className="flex flex-col text-center">
										<span className="text-[20px] font-semibold">{user.username}</span>
										{user.isStreaming
										? <span className="flex gap-2"><BsBroadcast className="text-[25px]" /> LIVE</span>
										: <span className="flex gap-2">{user.lastStream == 0 ? 'Never streamed' : timeDifference(user.lastStream)}</span>}
									</div>
								</Link>
							)
						}
					)}
				</div>

				<div className="flex items-center gap-3 mt-12 font-bold text-[20px] py-5">
					<BsPeopleFill className="text-[25px]" />
					<span className="text-[23px] unselectable">STREAMERS</span>
				</div>
				<div className="flex flex-wrap gap-5">
					{props.users.length == 0
						? <span>No users found</span>
						: props.users.map(user => {
							return (
								<Link key={user.id} className="flex gap-7 bg-[#9c68b0] rounded-l-[50px] rounded-r-[15px] pr-5 transition-opacity hover:opacity-80" href={`/${user.username}`}>
									{user.avatar == 'default'
									? <DefaultAvatar size="60" username={user.username} font="25" />
									: <img src={user.avatar} className="rounded-full unselectable border-[5px] border-[#70676a]" width="60" alt="Avatar" />}
									<div className="flex flex-col text-center">
										<span className="text-[20px] font-semibold">{user.username}</span>
										{user.isStreaming
										? <span className="flex gap-2"><BsBroadcast className="text-[25px]" /> LIVE</span>
										: <span className="flex gap-2">{user.lastStream == 0 ? 'Never streamed' : timeDifference(user.lastStream)}</span>}
									</div>
								</Link>
							)
						}
					)}
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps(ctx) {
	let res = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/getUserList')

	return {
		props: res.data
	}
}