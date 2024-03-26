import { FastifyInstance } from 'fastify'
import { getAllVideos } from './get-all-videos'
import { createNewVideo } from './create-new-video'
import { updateVideo } from './update-video'
import { getVideoById } from './get-video-by-id'
import { deleteVideo } from './delete-video'
import { searchVideoByTitle } from './search-video-by-title'
import { getVideoByCategory } from './get-videos-by-category'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function videosRoutes(app: FastifyInstance) {
    app.get('/videos', getAllVideos)
    app.get('/videos/:videoId', { onRequest: [verifyJWT] },  getVideoById)
    app.get('/videos/search', { onRequest: [verifyJWT] }, searchVideoByTitle)
    app.get('/videos/category/:categoryId', { onRequest: [verifyJWT] },  getVideoByCategory)
    app.post('/videos',  { onRequest: [verifyJWT] }, createNewVideo)
    app.put('/videos/:videoId', { onRequest: [verifyJWT] }, updateVideo)
    app.delete('/videos/:videoId', { onRequest: [verifyJWT] }, deleteVideo)
}