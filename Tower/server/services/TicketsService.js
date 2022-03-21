
import { Mongoose } from "mongoose";
import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { towerEventsService } from "./TowerEventsService";

class TicketsService {
    async getEventTickets(id) {
        const towerEventTickets = await dbContext.TowerEvents.findById(id).populate('account', 'name picture')
        return towerEventTickets.map(MongooseDocument => {
            const towerEventTicket = MongooseDocument.toJSON()
            return {
                ticketId: towerEventTicket.id,
                accountId: towerEventTicket.accountId
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


