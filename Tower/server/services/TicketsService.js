
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
    async deleteTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
        if (ticket.accountId.toString() !== userId) {
            throw new BadRequest('not your ticket to delete')
        }
        const deletedTicket = await dbContext.Tickets.findByIdAndDelete(ticket.id)
        towerEvent.capacity++
        await towerEvent.save()
        return `deleted ticket ${deletedTicket}`

    }
    async getEventTickets(id) {
        const towerEventTickets = await dbContext.Tickets.find({ eventId: id }).populate('account', 'name picture')
        return towerEventTickets.map(MongooseDocument => {
            const towerEventTicket = MongooseDocument.toJSON()
            return {
                ...towerEventTicket.account,
                ticketId: towerEventTicket.id,
                eventId: towerEventTicket.eventId,
                accountId: towerEventTicket.accountId,
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


