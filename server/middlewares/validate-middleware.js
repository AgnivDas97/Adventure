//? await schema.parseAsync(req.body) is the line where you use Zod to validate the request body data against the defined schema.

// `.parse(data: any)` method is used to validate the data against the schema. If the data is valid, it returns the parsed data. If the data is invalid, it throws an error with details about the validation failure.

// Given any zod schema, you can call its `.parse` method to check data is vaild. If it is, a value is returned with full type information! Otherwise, an error is thrown with details about the validation failure. This is a great way to ensure that your data is valid before you do anything with it.

const validate=(schema)=>async(req, res, next)=>{
    try {
        const parseBody =await schema.parseAsync(req.body); // Parse and validate the request body against the schema
        req.body = parseBody; // Assign the parsed data back to req.body
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // res.status(400).json({ message: error.errors[0].message }); // Handle validation errors
        const getError={
            statusCode: 400,
            message: error.errors[0].message, // Extract the error message from the validation error
            extraDetails: error.errors, // Include extra details about the validation error
        };
        next(getError); // Pass the error to the next middleware
    }
} 


export default validate;