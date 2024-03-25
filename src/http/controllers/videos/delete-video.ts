import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const videoIdParamsSchema = z.object({
    videoId: z.coerce.number()
})

export async function deleteVideo(request: FastifyRequest, reply: FastifyReply) {
    const { videoId } = videoIdParamsSchema.parse(request.params)

    try {
        const existingVideo = await prisma.videos.findUnique({
            where: {
                id: videoId
            }
        }) 
    
        if (!existingVideo) {
            return reply.status(404).send({ message: 'Vídeo not found.' });
        }
    
        await prisma.videos.delete({
            where: {
                id: videoId
            },
        })
    
        return reply.status(204).send({ message: 'Deleted video.' })
    } catch (err) {
        console.error('Error deleting video:', err)
    }

}