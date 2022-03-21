import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";


export class TicketsController extends BaseController {
    constructor() {
        super('api')
        this.router
            .get('/events/:id/tickets')
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('/tickets', this.createTicket)
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
    async getEventTickets(req, res, next) {
        try {
            const eventTickets = await ticketsService.getEventTickets(req.params.id)
            return res.send(eventTickets)
        } catch (error) {
            next(error)
        }
    }


}

