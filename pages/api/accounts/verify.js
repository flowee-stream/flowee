import { connectMongo } from "@/util/mongo"

export default async function handler(req, res) {
    if(!req.body.token) return res.json({ success: false })

    if(!/^[a-zA-Z0-9_-]*$/.test(req.body.token)) return res.json({ success: false, errorCode: -1 })
    
    const db = await connectMongo()

    let account = await db.collection('accounts').findOne({ token: req.body.token })
    if(!account) return res.json({ success: false, errorCode: -1 })

    res.json({
        success: true,
        username: account.username,
        avatar: account.avatar
    })
}