import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './http/controllers/users/routes'
import { videosRoutes } from './http/controllers/videos/routes'
import { categoryRoutes } from './http/controllers/categories/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m',
    }
})

app.register(fastifyCookie)

app.register(usersRoutes)
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