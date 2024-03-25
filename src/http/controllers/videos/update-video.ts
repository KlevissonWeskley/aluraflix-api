import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const updateVideoBodySchema = z.object({
    title: z.string().min(5).max(30).optional(),
    description: z.string().max(250).optional(),
    url: z.string().url().optional()
})

const videoIdParamsSchema = z.object({
    videoId: z.coerce.number()
})

export async function updateVideo(request: FastifyRequest, reply: FastifyReply) {
    const { title, description, url } = updateVideoBodySchema.parse(request.body)
    const { videoId } = videoIdParamsSchema.parse(request.params)

    try {
        const video = await prisma.videos.update({
            where: {
                id: videoId
            },
            data: {
                title,
                description,
                url
            }
        })

        return reply.status(200).send({ video })
    } catch (err: any) {
        if (err.code === 'P2025') {
            return reply.status(404).send({ message: 'Video not found.' })
        }
        
        return reply.status(500).send({ message: 'Internal server error.', error: err })
    }

}