import { connectMongo } from "@/util/mongo"
import { generateToken } from "@/util/utils"
import { hashSync, genSaltSync } from "bcrypt"
import axios from "axios"

export default async function handler(req, res) {
    if(!req.body.username || !req.body.password || !req.body.captcha) return res.json({ success: false })

    if(!/^[a-zA-Z0-9-_]*$/.test(req.body.username)) return res.json({ success: false, errorCode: -1 })

    const db = await connectMongo()

    let account = await db.collection('accounts').findOne({
        username: req.body.username
    })
    if(account) return res.json({ success: false, errorCode: -2 })

    let data = new URLSearchParams()
    data.append('response', process.env.NEXT_PUBLIC_PRODUCTION == '1' ? req.body.captcha : '10000000-aaaa-bbbb-cccc-000000000001')
    data.append('secret', process.env.NEXT_PUBLIC_PRODUCTION == '1' ? process.env.CAPTCHA_SECRET : '0x0000000000000000000000000000000000000000')

    let verify = await axios.post('https://hcaptcha.com/siteverify', data)
    if(!verify.data.success) return res.json({ success: false, errorCode: -3 })

    let hash = hashSync(req.body.password, genSaltSync())
    let token = generateToken()

    await db.collection('accounts').insertOne({
        username: req.body.username,
        password: hash,
        token
    })

    res.send({ success: true, token })
}