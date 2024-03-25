import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const videoIdParamsSchema = z.object({
    videoId: z.coerce.number()
})

export async function getVideoById(request: FastifyRequest, reply: FastifyReply) {
    const { videoId } = videoIdParamsSchema.parse(request.params)

    const video = await prisma.videos.findUnique({
        where: {
            id: videoId
        }
    })

    if (!video) {
        return reply.status(404).send({ message: 'Video not found.' })
    }

    return reply.status(200).send({ video })
}