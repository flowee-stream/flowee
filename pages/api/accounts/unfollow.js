import { connectMongo } from "@/util/mongo"

export default async function handler(req, res) {
    if(!req.body.username || !req.body.token) return res.json({ success: false })

    const db = await connectMongo()

    let account = await db.collection('accounts').findOne({
        token: req.body.token
    })
    if(!account) return res.json({ success: false, errorCode: -1 })

    let target = await db.collection('accounts').findOne({
        username: req.body.username
    })
    if(!target) return res.json({ success: false, errorCode: -2 })

    let check = await db.collection('follows').findOne({
        user1: account._id,
        user2: target._id
    })
    if(!check) res.json({ success: false, errorCode: -3 })

    await db.collection('follows').findOneAndDelete({
        user1: account._id,
        user2: target._id
    })

    res.json({ success: true })
}