import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { render } from "sass";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.deleteComment)

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




    async deleteComment(req, res, next) {
        try {
            const commentToDelete = await commentsService.deleteComment(req.params.id, req.userInfo.id)
            return res.send(commentToDelete)
        } catch (error) {
            next(error)
        }



    }
}

