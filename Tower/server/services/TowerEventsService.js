
import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'


class TowerEventsService {
    async cancel(towerEventId, userId) {
        const towerEvent = await this.getById(towerEventId)
        if (towerEvent.creatorId.toString() !== userId) {
            throw new Forbidden('This isnt your event to cancel')
        }
        const original = await dbContext.TowerEvents.findById(towerEventId)
        original.isCanceled = !original.isCanceled
        await original.save()
        return original

    }
    async update(update) {
        const original = await this.getById(update.id)
        if (original.isCanceled == true) {
            throw new Forbidden('Cannot edit this event')
        }
        original.name = update.name ? update.name : original.name
        original.description = update.description ? update.description : original.description
        await original.save({ runValidators: true })
        return original
    }
    async getById(id) {
        const towerEvent = await dbContext.TowerEvents.findById(id)
        if (!towerEvent) {
            throw new BadRequest('invalid event id')
        }
        return towerEvent
    }
    async create(newTowerEvent) {
        let present = new Date()
        let currentDate = present.toLocaleDateString()
        if (newTowerEvent.startDate < currentDate) {
            throw new Forbidden("this date has already happened")
        }
        const towerEvent = await dbContext.TowerEvents.create(newTowerEvent)
        await towerEvent.populate('creator', 'name picture')
        return towerEvent
    }
    async getAll(query = {}) {
        const towerEvents = await dbContext.TowerEvents.find(query).populate('creator')
        return towerEvents
    }

}


export const towerEventsService = new TowerEventsService()