import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class TicketsService {
    async createTicket(ticketData) {
        const res = await api.post('api/tickets', ticketData)
        const newTicket = { ...res.data, name: res.data.account.name, picture: res.data.account.picture }
        AppState.tickets.push(newTicket)
        logger.log(newTicket)
    }
    async getEventTickets(towerEventId) {
        const res = await api.get('api/events/' + towerEventId + '/tickets')
        AppState.tickets = res.data
        logger.log(res.data)

    }
    async getMyTickets() {
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data
    }





}


export const ticketsService = new TicketsService()