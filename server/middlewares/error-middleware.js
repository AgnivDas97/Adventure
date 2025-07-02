const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err); // Log the error for debugging
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message }); // Handle validation errors
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID format' }); // Handle invalid ID format errors
    }
    if (err.code === 11000) {
        return res.status(409).json({ message: 'Duplicate key error' }); // Handle duplicate key errors
    }

    const statusCode = err.statusCode || 500; // Set the status code to 500 if not provided
    const message = err.message || 'Internal server error'; // Set the message to 'Internal server error' if not provided
    const extraDetails = err.extraDetails || null; // Set extra details to null if not provided
    res.status(statusCode).json({ message, extraDetails }); // Send the error response

    //res.status(500).json({ message: 'Internal server error' }); // Handle all other errors
}

export default errorMiddleware;