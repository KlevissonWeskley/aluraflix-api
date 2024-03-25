import { FastifyInstance } from 'fastify'
import { getAllVideos } from './get-all-videos'
import { createNewVideo } from './create-new-video'
import { updateVideo } from './update-video'
import { getVideoById } from './get-video-by-id'
import { deleteVideo } from './delete-video'
import { searchVideoByTitle } from './search-video-by-title'
import { getVideoByCategory } from './get-videos-by-category'

export async function videosRoutes(app: FastifyInstance) {
    app.get('/videos', getAllVideos)
    app.get('/videos/:videoId', getVideoById)
    app.get('/videos/search', searchVideoByTitle)
    app.get('/videos/category/:categoryId', getVideoByCategory)
    app.post('/videos', createNewVideo)
    app.put('/videos/:videoId', updateVideo)
    app.delete('/videos/:videoId', deleteVideo)
}