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

}




export const commentsService = new CommentsService()