
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



export const TicketSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
        accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    },
    { timestamps: true, toJSON: { virtuals: true } })


TicketSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

TicketSchema.virtual('towerEvent', {
    localField: 'eventId',
    foreignField: '_id',
    justOne: true,
    ref: 'TowerEvent'
})

TicketSchema.virtual('account', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'

})




