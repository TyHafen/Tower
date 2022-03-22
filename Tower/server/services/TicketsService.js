
import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { towerEventsService } from "./TowerEventsService";

class TicketsService {
    async getAccountTickets(query) {
        const accountTickets = await dbContext.Tickets.find(query).populate('towerEvent')
        return accountTickets.map(MongooseDocument => {
            const accountTicket = MongooseDocument.toJSON()
            return {
                ticketId: accountTicket.id,
                eventId: accountTicket.eventId,
                accountId: accountTicket.accountId,
                ...accountTicket.towerEvent
            }
        }
        )
    }
    deleteTicket(body) {

    }
    async getEventTickets(id) {
        const towerEventTickets = await dbContext.Tickets.find({ eventId: id }).populate('account', 'name picture')
        return towerEventTickets.map(MongooseDocument => {
            const towerEventTicket = MongooseDocument.toJSON()
            return {
                ticketId: towerEventTicket.id,
                eventId: towerEventTicket.eventId,
                ...towerEventTicket.account
            }
        }
        )
    }
    async create(ticket) {
        const towerEvent = await towerEventsService.getById(ticket.eventId)
        if (towerEvent.capacity == 0 || towerEvent.isCanceled == true) {
            throw new BadRequest('The event is canceled or there are no tickets left')
        }
        const newTicket = await dbContext.Tickets.create(ticket)
        await newTicket.populate('towerEvent')
        await newTicket.populate('account', 'picture name')
        towerEvent.capacity--
        await newTicket.save()
        await towerEvent.save()
        return newTicket
    }
}

export const ticketsService = new TicketsService()


