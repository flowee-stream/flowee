import { connectMongo } from "@/util/mongo"

export default async function handler(req, res) {
    if(!req.body.username || !req.body.token) return res.json({ success: false })

    const db = await connectMongo()

    let user1 = await db.collection('accounts').findOne({ token: req.body.token })
    if(!user1) return res.json({ success: false, errorCode: -1 })

    let user2 = await db.collection('accounts').findOne({ username: req.body.username })
    if(!user2) return res.json({ success: false, errorCode: -2 })

    if(user1._id.toString() == user2._id.toString()) return res.json({ success: false, errorCode: -3 })

    let check = await db.collection('follows').findOne({ user1: user1._id, user2: user2._id })
    if(check) return res.json({ success: false, errorCode: -4 })

    await db.collection('follows').insertOne({
        user1: user1._id,
        user2: user2._id,
        timestamp: Math.floor(Date.now() / 1000)
    })

    res.json({ success: true })
}