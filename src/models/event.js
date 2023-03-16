import eventSchema from '../schemas/event.js';

const saveEventModel = async(eventData) => {
    const newEvent = new eventSchema(eventData);
    await newEvent.save();
}

const updateEventModel = async(id, eventData) => {
    return await eventSchema.findByIdAndUpdate(id, eventData);
}

const deleteEventModel = async(id) => {
    return await eventSchema.findByIdAndDelete(id);
}

const getEventModelById = async (id) => {
    return await eventSchema.findById(id,
        { title: 1, description:1,location:1, date:1, _id: 0, id: '$_id' });
}

const getEventModel = async(userId) => {
    return await eventSchema.find({ user_id: userId },
        {title: 1, description:1,location:1, date:1, _id: 0, id: '$_id' });
}

export { saveEventModel, updateEventModel, deleteEventModel, getEventModel, getEventModelById };