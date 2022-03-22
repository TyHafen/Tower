import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";
import { Forbidden } from "../utils/Errors";


export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
    }
    async createTicket(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            const newTicket = await ticketsService.create(req.body)
            return res.send(newTicket)
        } catch (error) {
            next(error)
        }
    }
    async deleteTicket(req, res, next) {
        try {
            req.body.ticketId = req.params.id
            if (req.body.creatorId !== req.body.userInfo.id) {
                throw new Forbidden('not your ticket to delete')
            }
            const ticket = await ticketsService.deleteTicket()
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }


}

