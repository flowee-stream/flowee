import { connectMongo } from "@/util/mongo"

export default async function handler(req, res) {
    if(!req.body.token || !req.body.newUsername) return res.json({ success: false })

    if(req.body.newUsername.length > 50) return res.json({ success: false, errorCode: -1 })

    const db = await connectMongo()

    let result = await db.collection('accounts').updateOne({
        token: req.body.token
    }, {
        $set: {
            username: req.body.newUsername
        }
    })

    if(result.matchedCount > 0) {
        res.json({ success: true })
    } else {
        res.json({ success: false, errorCode: -2 })
    }
}
