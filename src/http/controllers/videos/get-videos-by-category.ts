import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const categoryIdParamsSchema = z.object({
    categoryId: z.coerce.number()
})

export async function getVideoByCategory(request: FastifyRequest, reply: FastifyReply) {
    const { categoryId } = categoryIdParamsSchema.parse(request.params)

    const videos = await prisma.videos.findMany({
        where: {
            categoryId,
        }
    })

    if (!videos) {
        return reply.status(404).send({ message: 'Videos not found.' })
    }

    return reply.status(200).send({ videos })
}