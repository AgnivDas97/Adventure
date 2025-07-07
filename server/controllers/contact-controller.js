import {Contact} from "../models/contact-model.js";

const contactForm=async(req, res)=>{
    try {
        const { name, email, message, phone } = req.body;
        // Validate the request body
        if (!name || !email || !message || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Save the contact form data to the database
        const contactData = await Contact.create({
            name,
            email,
            phone, 
            message,
        });
        res.status(201).json({ message: 'Contact form submitted successfully', contactData }); // Send the created contact data as a response
    } catch (error) {
        console.error('Error in contact controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default contactForm;