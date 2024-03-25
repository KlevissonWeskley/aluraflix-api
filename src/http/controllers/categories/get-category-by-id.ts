import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const categoryIdParamsSchema = z.object({
    categoryId: z.coerce.number()
})

export async function getCategoryById(request: FastifyRequest, reply: FastifyReply) {
    const { categoryId } = categoryIdParamsSchema.parse(request.params)

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })

    if (!category) {
        return reply.status(404).send({ message: 'Category not found.' })
    }

    return reply.status(200).send({ category })
}