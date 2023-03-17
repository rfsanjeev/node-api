import expressError from '../utils/expressError.js';
import eventSchema from "../schemas/event.js";
import { addData, updateData, deleteData, getDataById, getData} from "../models/model.js";

const createEvent = async(req, res, next) => {
        await addData(eventSchema, req.body);
        res.status(201).json({message: 'Event created successfully!'});        
};

const updateEvent = async(req, res, next) => {
        const updateEvent = await updateData(eventSchema, req.params.id, req.body);
        if (!updateEvent) throw new expressError('Invalid Event Data Provided');

        res.status(200).json({message: 'Event updated successfully!'}); 
}

const deleteEvent = async(req, res, next) => {
        const deleteEvent = await deleteData(eventSchema, req.params.id);
        if (!deleteEvent) throw new expressError('Invalid Event Data Provided')

        res.status(200).json({message: 'Event Deleted successfully'}); 
}

const getEventById = async(req, res, next) => {
        const eventData = await getDataById(eventSchema, req.params.id);

        res.status(200).json({data: eventData});
}

const getEvent = async(req, res, next) => {
        const eventData = await getData(eventSchema, req.body.user_id);

        res.status(200).json({data: eventData});
}

export { createEvent, updateEvent, deleteEvent, getEventById, getEvent };