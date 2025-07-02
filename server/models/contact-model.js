import mongoose from 'mongoose';

const { Schema , model } = mongoose;
// Define the contact schema
//! The contact schema defines the structure of the contact form data that will be stored in the database
const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Sets the default value to the current date and time
    },
});

// Create the contact model or collection
export const Contact = new model('Contact', contactSchema);


// export Contact;