import { saveEventModel, updateEventModel, deleteEventModel,
        getEventModel, getEventModelById } from '../models/event.js';
import expressError from '../utils/expressError.js';

const createEvent = async(req, res, next) => {
        await saveEventModel(req.body);
        res.status(201).json({message: 'Event created successfully!'});        
};

const updateEvent = async(req, res, next) => {
        const updateEvent = await updateEventModel(req.params.id, req.body);
        if (!updateEvent) throw new expressError('Invalid Event Data Provided');

        res.status(200).json({message: 'Event updated successfully!'}); 
}

const deleteEvent = async(req, res, next) => {
        const deleteEvent = await deleteEventModel(req.params.id);
        if (!deleteEvent) throw new expressError('Invalid Event Data Provided')

        res.status(200).json({message: 'Event Deleted successfully'}); 
}

const getEventById = async(req, res, next) => {
        const eventData = await getEventModelById(req.params.id);

        res.status(200).json({date: eventData});
}

const getEvent = async(req, res, next) => {
        const eventData = await getEventModel(req.body.user_id);

        res.status(200).json({date: eventData});
}

export { createEvent, updateEvent, deleteEvent, getEventById, getEvent };