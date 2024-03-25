import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function getAllVideos(request: FastifyRequest, reply: FastifyReply) {
    const videos = await prisma.videos.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            url: true,
            category: true,
        }
    })

    return reply.status(200).send({ videos })
}