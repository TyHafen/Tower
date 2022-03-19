
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventsService } from '../services/TowerEventsService'


export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.update)
            .delete('/:id', this.cancel)

    }
    async cancel(req, res, next) {
        try {
            const userId = req.userInfo.id
            const towerEventId = req.params.id
            const message = await towerEventsService.cancel(towerEventId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const updateTask = await towerEventsService.update(req.body)
            return res.send(updateTask)
        } catch (error) {
            next(error)
        }

    }
    async getById(req, res, next) {
        try {
            const towerEvent = await towerEventsService.getById(req.params.id)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }


    async getAll(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAll(req.query)
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }

    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.create(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
}



