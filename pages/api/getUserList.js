import { connectMongo } from "@/util/mongo";

export default async function getUserList(req, res) {
    const db = await connectMongo()

    let live = []
    let users = []

    let liveUsers = await db.collection('accounts').find({ isStreaming: true }).toArray()
    liveUsers = liveUsers.sort((a, b) => {
        return b.lastStreamTimestamp - a.lastStreamTimestamp
    })

    for(const user of liveUsers) {
        live.push({
            id: user._id.toString(),
            username: user.username,
            avatar: user.avatar,
            isStreaming: user.isStreaming,
            lastStream: user.lastStream
        })
    }

    let streamers = await db.collection('accounts').find().toArray()
    streamers = streamers.sort((a, b) => {
        return b.lastStreamTimestamp - a.lastStreamTimestamp
    })

    for(const streamer of streamers) {
        users.push({
            id: streamer._id.toString(),
            username: streamer.username,
            avatar: streamer.avatar,
            isStreaming: streamer.isStreaming,
            lastStream: streamer.lastStream
        })
    }

    res.json({ success: true, live, users })
}