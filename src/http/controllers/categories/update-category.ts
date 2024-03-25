import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const updateCategoryBodySchema = z.object({
    title: z.string().min(5).max(30).optional(),
})

const categoryIdParamsSchema = z.object({
    categoryId: z.coerce.number()
})

export async function updateCategory(request: FastifyRequest, reply: FastifyReply) {
    const { title } = updateCategoryBodySchema.parse(request.body)
    const { categoryId } = categoryIdParamsSchema.parse(request.params)

    const category = await prisma.category.update({
        where: {
            id: categoryId
        },
        data: {
            title,
        }
    })

    return reply.status(200).send({ category })
}