import { Schema, model } from 'mongoose'

const schema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        completedMeetings: { type: Number },
        image: { type: String },
        profession: { type: Schema.Types.ObjectId, ref: 'Profession' },
        qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }],
        rate: { type: Number },
        sex: { type: String, enum: ['male', 'female'] }
    },
    {
        timestamps: true
    }
)

export default model('User', schema)
