import createHttpError from 'http-errors'
import identityKeyUtil from '../utils/identity-key.util.js'

export async function register(req, res, next) {
     const {identity, firstName, lastName, password, confirmPassword} = req.body
    // validation
    if(!identity.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !confirmPassword.trim()) {
        return next(createHttpError[400]('fill all inputs')) }
    if(confirmPassword !== password) {
        return next(createHttpError[400]('check confirm-password ')) }

    const identityKey = identityKeyUtil(identity)

    res.json({
        message : 'Register controller',
        identityKey : identityKey
    })
}

export function login(req, res) {
    res.json({
    msg : 'Login route',
    body : req.body
  })
}


