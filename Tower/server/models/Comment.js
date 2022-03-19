
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


export const CommentSchema = new Schema(
    {
        body: { type: String, required: true },
        eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
        creatorId: { type: ObjectId, ref: 'Account', required: true },
    },
    { timestamps: true, toJSON: { virtuals: true } })


CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'TowerEvent',
    justOne: true
})



