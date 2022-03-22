import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";


class CommentsService {
    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (comment.creatorId != userId) {
            throw new Forbidden('not your comment to delete')
        } const deletedComment = await dbContext.Comments.findByIdAndDelete(commentId)
        return `deleted ${deletedComment}`

    }
    async getEventComments(query = {}) {
        const eventComments = await dbContext.Comments.find(query).populate('creator')
        return eventComments


    }
    async create(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name picture')
        await comment.populate('event')
        return comment
    }
    async
}



export const commentsService = new CommentsService()