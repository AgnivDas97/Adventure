const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500; // Set the status code to 500 if not provided
    const message = err.message || 'Internal server error'; // Set the message to 'Internal server error' if not provided
    const extraDetails = err.extraDetails || null; // Set extra details to null if not provided
    return res.status(status).json({ message, extraDetails }); // Send the error response

    //res.status(500).json({ message: 'Internal server error' }); // Handle all other errors
}

export default errorMiddleware;