import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { hash } from 'bcryptjs'

const registerUserBodySchema = z.object({
    username: z.string().min(5),
    password: z.string()
})

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
    const { username, password } = registerUserBodySchema.parse(request.body)
    
    try {

        const userAlreadyExists = await prisma.users.findUnique({
            where: {
                username,
            }
        })
    
        if (userAlreadyExists) {
            return reply.status(400).send({ message: 'User already exists.' })
        }
    
        const password_hash = await hash(password, 6)
    
        await prisma.users.create({
            data: {
                username,
                password: password_hash
            }
        })
    
        return reply.status(201).send({ message: 'User registred.' })
    } catch (err: any) {
        return reply.status(500).send({ message: 'Error when registering user.', error: err.message })
    }

}