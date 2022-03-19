import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class CommentsService {
    async getEventComments(towerEventId) {
        const eventComments = await dbContext.Comments.find({ towerEventId })
        return eventComments


    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        await comment.populate('event')
        return comment
    }
    async
}



export const commentsService = new CommentsService()