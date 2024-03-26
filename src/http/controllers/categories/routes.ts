import { FastifyInstance } from 'fastify'
import { createNewCategory } from './create-new-category'
import { getAllCategories } from './get-all-categories'
import { getCategoryById } from './get-category-by-id'
import { updateCategory } from './update-category'
import { deleteCategory } from './delete-category'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function categoryRoutes(app: FastifyInstance) {
    app.get('/categories', { onRequest: [verifyJWT] }, getAllCategories)
    app.get('/categories/:categoryId', { onRequest: [verifyJWT] }, getCategoryById)
    app.post('/categories', { onRequest: [verifyJWT] }, createNewCategory)
    app.patch('/categories/:categoryId', { onRequest: [verifyJWT] }, updateCategory)
    app.delete('/categories/:categoryId', { onRequest: [verifyJWT] }, deleteCategory)
}