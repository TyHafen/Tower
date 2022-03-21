
import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { towerEventsService } from "./TowerEventsService";

class TicketsService {
    async create(ticket) {
        const towerEvent = await towerEventsService.getById(ticket.towerEventId)
        if (ticket.capacity == 0 || ticket.isCanceled == true) {
            throw new BadRequest('The event is canceled or there are no tickets left')
        }
        const newTicket = await dbContext.Tickets.create(ticket)
        ticket.capacity--
        await ticket.save()
        return newTicket
    }
}

export const ticketsService = new TicketsService()


