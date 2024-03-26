import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const createNewVideoBodySchema = z.object({
    title: z.string().min(5).max(30),
    description: z.string().max(250).optional(),
    url: z.string().url(),
    categoryId: z.coerce.number(),
})

export async function createNewVideo(request: FastifyRequest, reply: FastifyReply) {
    const { title, description, url, categoryId } = createNewVideoBodySchema.parse(request.body)

    try {
        const video = await prisma.videos.create({
            data: {
                title,
                description,
                url,
                categoryId,
                userId: request.user.sub
            }
        })

        return reply.status(201).send({ video })
    } catch (err) {
        console.error('Error creating video:', err)
    }
}