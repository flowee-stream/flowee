import { connectMongo } from "@/util/mongo"
import { buildStreamToken } from "@/util/utils"

export default async function handler(req, res) {
    if(!req.query.token) return res.json({ success: false })

    const db = await connectMongo()

    let account = await db.collection('accounts').findOne({ token: req.query.token })
    if(!account) return res.json({ success: false, errorCode: -1 })

    res.json({
        success: true,
        streamToken: buildStreamToken(account._id.toString(), account.streamToken),
        streamName: account.streamName
    })
}