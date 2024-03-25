import { FastifyInstance } from 'fastify'
import { createNewCategory } from './create-new-category'
import { getAllCategories } from './get-all-categories'
import { getCategoryById } from './get-category-by-id'
import { updateCategory } from './update-category'
import { deleteCategory } from './delete-category'

export async function categoryRoutes(app: FastifyInstance) {
    app.get('/categories', getAllCategories)
    app.get('/categories/:categoryId', getCategoryById)
    app.post('/categories', createNewCategory)
    app.patch('/categories/:categoryId', updateCategory)
    app.delete('/categories/:categoryId', deleteCategory)
}