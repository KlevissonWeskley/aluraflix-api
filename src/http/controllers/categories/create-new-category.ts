import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const createNewCategoryBodySchema = z.object({
    title: z.string().min(5).max(30),
})

export async function createNewCategory(request: FastifyRequest, reply: FastifyReply) {
    const { title } = createNewCategoryBodySchema.parse(request.body)

    const category = await prisma.category.create({
        data: {
            title,
        }
    })

    return reply.status(201).send({ category })
}