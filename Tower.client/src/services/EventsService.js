import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";


class EventsService {
    async setActiveEvent(id) {
        const res = await api.get('api/events/' + id)
        logger.log(res.data)
        AppState.activeEvent = res.data
        logger.log('active event', res.data)

    }
    async getEvents() {
        const res = await api.get('api/events')
        AppState.towerEvents = res.data
        logger.log(res.data)
    }

    filterEvents(theType) {
        AppState.towerEvents = AppState.towerEvents.filter(t => t.type == theType)
        logger.log('this is the type', AppState.towerEvents)
    }
}


export const eventsService = new EventsService()