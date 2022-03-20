import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class CommentsService {
    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (comment.creatorId.toString() != userId) {
            throw new Forbidden('not your comment to delete')
        } const deleteComment = await dbContext.Comments.findByIdAndDelete(commentId)
        return `deleted ${deleteComment}`
    }
    async getEventComments(towerEventId) {
        const eventComments = await dbContext.Comments
        return eventComments


    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name id')
        await comment.populate('event')
        return comment
    }
    async
}



export const commentsService = new CommentsService()