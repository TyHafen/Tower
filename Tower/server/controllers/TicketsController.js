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
            .delete('/:id', this.deleteTicket)
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
            const ticketId = req.params.id
            const ticket = await ticketsService.deleteTicket(ticketId, req.userInfo.id)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }


}

