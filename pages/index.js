import Head from "next/head"
import Link from "next/link"
import Sidebar from "@/components/Sidebar"

import { BsBroadcast, BsPeopleFill } from "react-icons/bs"

export default function Home() {
	return (
		<>
			<Head>
				<title>Flowee</title>
			</Head>
			<Sidebar />
			<main className="ml-[20px] md:ml-[150px] mt-[50px]">
				<div className="flex flex-col">
					<span className="font-bold text-[40px]">Welcome home</span>
					<span className="font-semibold text-[25px]">Flowee is an open-source streaming platform built for people</span>
					<div className="flex mt-5">
						<a href="https://github.com/flowee-stream"><button>GitHub</button></a>
					</div>
				</div>

				<div className="flex items-center gap-3 mt-12 font-bold text-[20px] py-5">
					<BsBroadcast className="text-[25px]" />
					<span className="text-[23px] unselectable">LIVE</span>
				</div>
				<div className="flex flex-wrap gap-5">
					<Link className="flex gap-7 bg-[#9c68b0] rounded-l-[50px] rounded-r-[15px] pr-5 transition-opacity hover:opacity-80" href="/myst">
						<img src="https://github.com/mdo.png" className="rounded-full unselectable border-[5px] border-[#774d83]" width="60" alt="Avatar" />
						<div className="flex flex-col text-center">
							<span className="text-[20px] font-semibold">myst</span>
							<span className="flex gap-2"><BsBroadcast className="text-[25px]" /> LIVE</span>
						</div>
					</Link>
				</div>

				<div className="flex items-center gap-3 mt-12 font-bold text-[20px] py-5">
					<BsPeopleFill className="text-[25px]" />
					<span className="text-[23px] unselectable">STREAMERS</span>
				</div>
				<div className="flex flex-wrap gap-5">
					<Link className="flex gap-7 bg-[#9c68b0] rounded-l-[50px] rounded-r-[15px] pr-5 transition-opacity hover:opacity-80" href="/myst">
						<img src="https://github.com/mdo.png" className="rounded-full unselectable border-[5px] border-[#774d83]" width="60" alt="Avatar" />
						<div className="flex flex-col text-center">
							<span className="text-[20px] font-semibold">unity</span>
							<span>12 minutes ago</span>
						</div>
					</Link>
					<Link className="flex gap-7 bg-[#9c68b0] rounded-l-[50px] rounded-r-[15px] pr-5 transition-opacity hover:opacity-80" href="/myst">
						<img src="https://github.com/mdo.png" className="rounded-full unselectable border-[5px] border-[#774d83]" width="60" alt="Avatar" />
						<div className="flex flex-col text-center">
							<span className="text-[20px] font-semibold">u-boot</span>
							<span>1 hour ago</span>
						</div>
					</Link>
				</div>
			</main>
		</>
	)
}