import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { render } from "sass";

export class CommentsController extends BaseController {
    constructor() {
        super('api')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/comments', this.create)
            .get('/events/:id/comments', this.getEventComments)
            .delete('/comments/:id', this.deleteComment)

    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const newComment = await commentsService.create(req.body)
            return res.send(newComment)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next) {
        try {
            const towerEventId = req.params.id
            const eventComments = await commentsService.getEventComments(towerEventId)
            return res.send(eventComments)
        } catch (error) {
            next(error)
        }
    }


    async deleteComment(req, res, next) {
        try {
            const userId = req.userInfo.id
            const commentId = req.params.id
            const commentToDelete = await commentsService.deleteComment(commentId, userId)
            return res.send(commentToDelete)
        } catch (error) {
            next(error)
        }



    }
}

