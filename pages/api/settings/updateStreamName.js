import { connectMongo } from "@/util/mongo"

export default async function handler(req, res) {
    if(!req.body.token || !req.body.newStreamName) return res.json({ success: false })

    const db = await connectMongo()

    let result = await db.collection('accounts').updateOne({
        token: req.body.token
    }, {
        $set: {
            streamName: req.body.newStreamName
        }
    })

    if(result.matchedCount > 0) {
        res.json({ success: true })
    } else {
        res.json({ success: false, errorCode: -1 })
    }
}