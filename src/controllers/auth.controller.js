import { prisma } from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors'
import { loginSchema, registerSchema } from '../validations/schema.js'
import { createUser, getUserBy } from '../services/user.service.js'

export async function register(req, res, next) {
     const {identity, firstName, lastName, password, confirmPassword} = req.body
    // validation
    // if(!identity.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !confirmPassword.trim()) {
    //     return next(createHttpError[400]('fill all inputs')) }
    // if(confirmPassword !== password) {
    //     return next(createHttpError[400]('check confirm-password ')) }

    const data = await registerSchema.parseAsync(req.body)
    const identityKey = data.email ? 'email' : 'mobile'

    console.log(data)

    // const identityKey = identityKeyUtil(identity)
    //     if(!identityKey) {
    //     return next(createHttpError[400]('identity must be email or phone number')) }
    
    // find user for non-duplicate


    // const haveUser = await prisma.user.findUnique({
    //     where : { [identityKey] : data[identityKey]}
    // })
    const haveUser = await getUserBy(identityKey, data[identityKey])

    if(haveUser) {
        return next(createHttpError[409]('This user already register'))
    }

    // const newUser = {
    //     [identityKey] : identity,
    //     password : await bcrypt.hash(password, 10),
    //     firstName : firstName,
    //     lastName : lastName 
    // }

    //const result = await prisma.user.create({data : data})
    const result = await createUser(data)

    res.json({
        message : 'Register Successful', 
        result : result
    })
}


export async function login(req, res, next) {

    const data = loginSchema.parse(req.body)
    const identityKey = data.email ? 'email' : 'mobile'

//     // find user in DB
//     const foundUser = await prisma.user.findFirst({
//    where: { [identityKey]: data[identityKey] }
//  })
    const foundUser = await getUserBy(identityKey, data[identityKey])


 console.log(foundUser)
    if (!foundUser) {
   return next(createHttpError[401]('Invalid login 1'))
 }

    // check password
    const pwOk = await bcrypt.compare(data.password, foundUser.password)
    if (!pwOk) { return next(createHttpError[401]('Invalid Login 2')) }

    //  create token
    const payload = { id: foundUser.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '15d'
    })

    //  rip password, createdAt, updatedAt
    const { password, createdAt, updatedAt, ...userData } = foundUser

    res.json({
    msg : 'Login controller',
    token: token,
    user : userData,
  })
}


export function getMe(req, res, next){
    res.json({ user: req.user})
}
