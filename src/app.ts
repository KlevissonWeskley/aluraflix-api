import fastify from 'fastify'
import { videosRoutes } from './http/controllers/videos/routes'
import { ZodError } from 'zod'
import { categoryRoutes } from './http/controllers/categories/routes'

export const app = fastify()

app.register(videosRoutes)
app.register(categoryRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
                .status(400)
                .send({ message: 'Validation error.', issues: error.format() })
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})