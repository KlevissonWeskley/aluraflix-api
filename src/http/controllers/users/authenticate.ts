import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { compare } from 'bcryptjs'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        username: z.string().min(5),
        password: z.string().min(6)
    })

    const { username, password } = authenticateBodySchema.parse(request.body)

    try {

        const user = await prisma.users.findUnique({
            where: {
                username,
            }
        })

        if (!user) {
            return reply.status(400).send({ message: 'Invalid Credentials.' })
        }

        const doesPasswordMatches = await compare(password, user.password)

        if (!doesPasswordMatches) {
            return reply.status(400).send({ message: 'Invalid Credentials.' })
        }

        const token = await reply.jwtSign(
            {}, 
            {
                sign: {
                    sub: user.id
                }
            }
        )
    
        const refreshToken = await reply.jwtSign(
            {}, 
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d'
                }
            }
        )
    
        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({
                token
            })
    } catch (err) {
        
    }

}