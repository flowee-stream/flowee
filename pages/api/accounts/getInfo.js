import { connectMongo } from "@/util/mongo"
import { buildStreamToken } from "@/util/utils"

export default async function handler(req, res) {
    if(!req.query.username) return res.json({ success: false })

    const db = await connectMongo()

    let account
    let authorized = false

    let target = await db.collection('accounts').findOne({ username: req.query.username })
    if(!target) return res.json({ success: false, errorCode: -1 })

    if(req.query.token) {
        account = await db.collection('accounts').findOne({ token: req.query.token })
        if(!account) return res.json({ success: false, errorCode: -2 })

        authorized = true
    }

    let followers = await db.collection('follows').find({ user2: target._id }).toArray()

    let reply = {
        success: true,
        username: target.username,
        avatar: target.avatar,
        followers: followers.length,
        isStreaming: target.isStreaming,
        lastStream: target.lastStream,
        streamName: target.streamName,
        streamURL: target.streamURL,
        views: target.views
    }

    if(authorized) {
        let followCheck = await db.collection('follows').findOne({
            user1: account._id,
            user2: target._id
        })
        
        reply['isFollowed'] = Boolean(followCheck)
    }

    if(authorized && target._id.toString() == account._id.toString()) {
        reply.streamToken = buildStreamToken(account._id.toString(), account.streamToken)
        reply.isYou = true
    }

    res.json(reply)
}