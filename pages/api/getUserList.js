import { connectMongo } from "@/util/mongo";

export default async function getUserList(req, res) {
    const db = await connectMongo()

    let live = []
    let users = []

    let liveUsers = await db.collection('accounts').find({ isStreaming: true }).toArray()
    liveUsers = liveUsers.sort((a, b) => {
        return b.lastStream - a.lastStream
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
        return b.lastStream - a.lastStream
    })

    for(const user of streamers) {
        if(user.lastStream == 0) continue

        users.push({
            id: user._id.toString(),
            username: user.username,
            avatar: user.avatar,
            isStreaming: user.isStreaming,
            lastStream: user.lastStream
        })
    }

    res.json({ success: true, live, users })
}