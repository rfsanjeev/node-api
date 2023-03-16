import mongoose from 'mongoose';

const opts = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
};

const eventSchema = new mongoose.Schema({
    title: {
        type : String,
        required: [true, 'Title is required']
    },
    description: String,
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User Id is required']
    }
}, opts);

export default mongoose.model('event', eventSchema);