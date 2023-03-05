import { connectMongo } from "@/util/mongo"
import { generateToken, getTimestamp } from "@/util/utils"
import { hashSync, genSaltSync } from "bcrypt"
import axios from "axios"

export default async function handler(req, res) {
    if(!req.body.username || !req.body.password || !req.body.captcha) return res.json({ success: false })

    let badUsernames = [
        'settings',
        'about',
        'register',
        'login'
    ]

    if(badUsernames.includes(req.body.username)) return res.json({ success: false, errorCode: -99 })

    if(!/^[a-zA-Z0-9-_]*$/.test(req.body.username)) return res.json({ success: false, errorCode: -1 })
    if(req.body.username.length < 3 || req.body.username.length > 15) return res.json({ success: false, errorCode: -2 })

    const db = await connectMongo()

    let account = await db.collection('accounts').findOne({
        username: req.body.username
    })
    if(account) return res.json({ success: false, errorCode: -3 })

    let data = new URLSearchParams()
    data.append('response', process.env.NEXT_PUBLIC_PRODUCTION == '1' ? req.body.captcha : '10000000-aaaa-bbbb-cccc-000000000001')
    data.append('secret', process.env.NEXT_PUBLIC_PRODUCTION == '1' ? process.env.CAPTCHA_SECRET : '0x0000000000000000000000000000000000000000')

    let verify = await axios.post('https://hcaptcha.com/siteverify', data)
    if(!verify.data.success) return res.json({ success: false, errorCode: -4 })

    let hash = hashSync(req.body.password, genSaltSync())
    let token = generateToken()
    let streamToken = generateToken()

    await db.collection('accounts').insertOne({
        username: req.body.username,
        password: hash,
        avatar: 'default',
        registerDate: getTimestamp(),
        token,
        isStreaming: false,
        streamURL: null,
        streamToken,
        streamName: req.body.username + '\'s stream',
        lastStream: 0,
        views: 0
    })

    res.send({ success: true, token })
}