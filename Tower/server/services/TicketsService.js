
import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { towerEventsService } from "./TowerEventsService";

class TicketsService {
    async createOrUpdate(ticketBody) {
        const ticket = await towerEventsService.getById(ticketBody.eventId)
        if (ticket.capacity == 0 || ticket.isCanceled == true) {
            throw new BadRequest('Thee show is canceled or there are no tickets left')
        }
        const newTicket = await dbContext.Tickets.create(ticketBody)
        await newTicket.populate('towerEvent')
        await newTicket.populate('purchaser')
        ticket.capacity--
        await ticket.save()
        return newTicket
    }
}

export const ticketsService = new TicketsService()


