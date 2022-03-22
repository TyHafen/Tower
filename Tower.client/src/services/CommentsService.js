import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class CommentsService {

    async getComments(towerEventsId,) {
        const res = await api.get('api/events/' + towerEventsId + '/comments')
        AppState.comments = res.data
        logger.log('comments', res.data)
    }
    async createComment(newComment) {
        const res = await api.post('api/comments/', newComment)
        logger.log('new comment', res.data)

        AppState.comments.unshift(res.data)
    }
    async deleteComment(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        logger.log(res.data)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
    }

}




export const commentsService = new CommentsService()