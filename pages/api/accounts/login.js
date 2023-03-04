import { connectMongo } from "@/util/mongo"
import { compareSync } from "bcrypt"

export default async function handler(req, res) {
    if(!req.body.username || !req.body.password) return res.json({ success: false })

    const db = await connectMongo()

    let account = await db.collection('accounts').findOne({
        username: req.body.username
    })
    if(!account) return res.json({ success: false, errorCode: -1 })

    if(compareSync(req.body.password, account.password)) return res.json({ success: true, token: account.token })
    else return res.json({ success: false, errorCode: -1 })
}