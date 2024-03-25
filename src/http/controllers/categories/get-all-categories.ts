import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function getAllCategories(request: FastifyRequest, reply: FastifyReply) {
    const categories = await prisma.category.findMany()

    return reply.status(200).send({ categories })
}