import { Router } from "express";
import { userAuthValidator, userLoginValidator } from "zod-checks";
import { userLoginType, userSignupType } from "type-checks";
import { prisma } from "database";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SIGN_TOKEN } from "../../../apiconfig";
import { auth } from 'firebase-admin-config'

export const authRouter = Router()

authRouter.post('/usersignup', async (req, res) => {
    const userAuthInfo: userSignupType = req.body

    const userAuthInfoValidated = userAuthValidator.safeParse(userAuthInfo)
    console.log(userAuthInfoValidated)

    if (!userAuthInfoValidated.success) {
        return res.send({
            error: "information supplied is wrong"
        })
    }

    const email = userAuthInfo.email
    const password = userAuthInfo.password
    const rePassword = userAuthInfo.rePassword

    if (password !== rePassword) {
        return res.send({
            error: "password doesn't match"
        })
    }

    bcrypt.hash(password, 10)
        .then(async (hashedPassword) => {
            await prisma.users.create({
                data: {
                    email: email,
                    password: hashedPassword,
                }
            })

            jwt.sign(email, JWT_SIGN_TOKEN, { algorithm: 'HS256' }, (err, token) => {

                if (err) {
                    return res.send({
                        error: err
                    })
                }

                res.cookie('token', token, {
                    maxAge: 1,
                    httpOnly: true,
                    secure: true
                })

                res.send({
                    message: "user successfully created"
                })
            })
        })
})


authRouter.post('/login', async (req, res) => {
    const userLoginToken: string = req.body.token

    if (!userLoginToken) {
        return res.status(400).send({
            success: false,
            error: 'incorrect access token'
        })
    }

    const userEmail = await auth.verifyIdToken(userLoginToken).then((resp) => {
        console.log(resp)
        return resp.email
    })

    const tokenExp = await auth.verifyIdToken(userLoginToken).then((resp) => {
        console.log(resp)
        return resp.exp
    })

    const expTime = Math.floor((tokenExp - Date.now()) / 1000);

    const loggingUser = await prisma.users.findFirst({
        where: {
            email: userEmail
        }
    })

    if (loggingUser) {

        res.cookie('token', userLoginToken, {
            maxAge: expTime,
            httpOnly: true,
            secure: true
        })

        res.send({
            message: 'user successfully logged in'
        })

    } else {

        if (!userEmail) {
            return res.send({
                success: false,
                error: 'user email not present in the token'
            })
        }

        const newUser = await prisma.users.create({
            data: {
                email: userEmail,
                password: ''
            }
        })

        return res.send({
            success: false,
            message: 'new user created'
        })
    }
})