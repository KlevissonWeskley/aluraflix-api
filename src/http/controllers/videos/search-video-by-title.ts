import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const videoTitleQuerySchema = z.object({
    title: z.string().min(5).max(30),
})

export async function searchVideoByTitle(request: FastifyRequest, reply: FastifyReply) {
    const { title } = videoTitleQuerySchema.parse(request.query)

    try {
        if (!title) {
            return reply.status(404).send({ message: 'Video not found.' })
        }

        const videos = await prisma.videos.findMany({
            where: {
                title: {
                    contains: title
                }
            },
            select: {
                title: true,
                description: true,
                url: true,
                category: true
            }
        })

        return reply.status(200).send({ videos })
    } catch (err) {
        console.error('Error in search vídeos:', err);
        return reply.status(500).send({ message: 'An error occurred when searching for videos.' });
    }
}