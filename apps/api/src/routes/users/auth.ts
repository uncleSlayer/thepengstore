import { Router } from "express";
import { userAuthValidator, userLoginValidator } from "zod-checks";
import { userLoginType, userSignupType } from "type-checks";
import { prisma } from "database";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SIGN_TOKEN } from "../../../apiconfig";

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
    const userLoginInfo: userLoginType = req.body

    const userLoginInfoValidated = userLoginValidator.safeParse(userLoginInfo)

    if (!userLoginInfoValidated.success) {
        return res.send({
            error: "information supplied is wrong"
        })
    }

    const email = userLoginInfo.email
    const password = userLoginInfo.password

    const loggingUser = await prisma.users.findFirst({
        where: {
            email: email
        }
    })

    if (loggingUser) {
        bcrypt.compare(password, loggingUser.password)
            .then((resp) => {
                if (resp) {
                    jwt.sign(loggingUser.email, JWT_SIGN_TOKEN, { algorithm: 'HS256' }, (err, token) => {
                        if (err) {
                            return res.send({
                                error: err
                            })
                        }

                        res.cookie('token', token, {
                            maxAge: 5 * 60 * 1000,
                            httpOnly: true,
                            secure: true
                        })

                        res.send({
                            message: 'user successfully logged in'
                        })
                    })
                }
            })
    } else {
        return res.send({
            error: 'user with this credentials not found'
        })
    }
})