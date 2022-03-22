import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class CommentsService {

    async getComments(towerEventsId,) {
        const res = await api.get('api/events/' + towerEventsId + '/comments')
        AppState.comments = res.data
        logger.log('comments', res.data)
    }
    async createComment(body) {
        const res = await api.post('api/comments/', body)
        logger.log('new comment', res.data)
        AppState.comments(res.data)
    }
    async deleteComment(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
    }

}




export const commentsService = new CommentsService()