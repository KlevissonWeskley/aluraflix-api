import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const pageQueryParamSchema = z.object({
    page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1))
})

export async function getAllVideos(request: FastifyRequest, reply: FastifyReply) {
    const { page } = pageQueryParamSchema.parse(request.params)

    const perPage = 1

    const videos = await prisma.videos.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            url: true,
            category: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: perPage,
        skip: (page - 1) * perPage
    })

    return reply.status(200).send({ videos })
}