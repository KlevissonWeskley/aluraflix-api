import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

const categoryIdParamsSchema = z.object({
    categoryId: z.coerce.number()
})

export async function deleteCategory(request: FastifyRequest, reply: FastifyReply) {
    const { categoryId } = categoryIdParamsSchema.parse(request.params)

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        }) 
    
        if (!existingCategory) {
            return reply.status(404).send({ message: 'Category not found.' });
        }
    
        await prisma.category.delete({
            where: {
                id: categoryId
            },
        })
    
        return reply.status(204).send({ message: 'Deleted category.' })
    } catch (err) {
        console.error('Error deleting category:', err)
    }

}