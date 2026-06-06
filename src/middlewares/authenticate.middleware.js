import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { getUserBy } from '../services/user.service.js'

export default async function (req, res, next) {
    const authorization = req.headers.authorization
    // check headers ของ http request ต้องมี authorization
    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw(createHttpError[401]('Unauthorized 1'))
    }
    //extract token จาก header
    const token = authorization.split(' ')[1]
    console.log(token)
        if(!token) { throw(createHttpError[401]('Unauthorized 2')) }
    
    // verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)

    // เอา payload.id ไปหา user
    const foundUser = await getUserBy('id', payload.id)
    if(!foundUser) {
        throw(createHttpError[401]('Unauthorized 3'))
    }
    console.log(foundUser)

    //สร้าง userData ที่ไม่มี key : password, createdAt, updatedAt
    const {password, createdAt, updatedAt, ...userData} = foundUser
    req.user = userData

    next()
}