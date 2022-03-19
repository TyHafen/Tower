
import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class TicketsService {
    async createOrUpdate(ticket) {
        if (ticket.amount <= 0) {
            throw new BadRequest('no tickets left')
        }
        const newTicket = await dbContext.Tickets.findByIdAndUpdate({ eventId: ticket.towerEventId, accountId: ticket.accountId }, ticket, { upsert: true, new: true })
        ticket.amount -= 1
        return newTicket
    }
}

export const ticketsService = new TicketsService()


