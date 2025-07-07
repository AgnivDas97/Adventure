
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for generating JWTs



//! what is Schema?
//? Defines the structure of the data in the database, the documents within a collection. If specifies the feilds, their type, and any additional constraints or validations.

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures that each email is unique in the collection
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false, // Sets the default value to false
    },
    createdAt: {
        type: Date,
        default: Date.now, // Sets the default value to the current date and time
    },
});


//! what is Middleware?
//? Middleware is a function that is executed before or after a specific action in the application. In Mongoose, middleware can be used to perform actions such as validation, transformation, or logging before saving a document to the database or after retrieving it. Middleware can be defined for specific events, such as 'save', 'remove', or 'update', and can be used to modify the behavior of those events.

//! secure password with bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // If the password is not modified, skip hashing
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash the password with a salt rounds of 10
        next(); // Proceed to the next middleware or save the document
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

//! compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

//! json web token
//instance method to generate a JWT
userSchema.methods.generateToken = async function () { 
    try {
        return jwt.sign(
            { userId: this._id, email: this.email, isAdmin: this.isAdmin }, // Payload containing user ID and admin status
            process.env.JWT_SECRET, // Secret key for signing the token
            { expiresIn: '10h' } // Token expiration time
        );
    } catch (error) {
        console.error('Error generating token:', error);
        
    }
}


//! what is Model?
//? A Model is a class that represents a collection in the database. It provides an interface for interacting with the data in that collection, including methods for creating, reading, updating, and deleting documents.

const User = mongoose.model('User', userSchema); // Creates a model named 'User' based on the userSchema
export default User; 


//! what is Document?
//? A Document is an instance of a Model. It represents a single record in the collection and contains the data for that record. Documents are created from Models and can be saved to the database.


//! what is JWT?
//? JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object. It is commonly used for authentication and authorization in web applications. JWTs are compact, URL-safe tokens that can be used to verify the identity of a user and ensure the integrity of the data being transmitted. They consist of three parts: header, payload, and signature. The header contains metadata about the token, the payload contains the claims (data), and the signature is used to verify that the sender of the token is who it claims to be and to ensure that the message wasn't changed along the way.
//1. **Authentication**: JWTs are commonly used for user authentication. When a user logs in, the server generates a JWT and sends it back to the client. The client stores the token and includes it in the Authorization header of subsequent requests to access protected resources.
//2. **Authorization**: JWTs can also be used to authorize access to specific resources or actions. The server can include claims in the token that specify the user's roles or permissions, allowing the server to enforce access control based on those claims.
////Eample: In a web application, when a user logs in, the server generates a JWT that includes the user's ID and roles. The client stores the token and includes it in the Authorization header of subsequent requests. The server verifies the token's signature and decodes the payload to extract the user's identity and claims. Based on the claims, the server can determine whether to allow or deny access to specific resources or actions.
//! what is Token?
//? A token is a piece of data that represents the user's identity and is used to authenticate and authorize access to resources. In the context of JWT, the token is a compact, URL-safe string that contains the encoded header, payload, and signature. The token is generated by the server and sent to the client after successful authentication. The client includes the token in the Authorization header of subsequent requests to access protected resources. The server verifies the token's signature and decodes the payload to extract the user's identity and claims.
//! Components of JWT:
//1. Header: //? Contains metadata about the token, including the type of token (JWT) and the signing algorithm used (e.g., HMAC SHA256).
//2. Payload: //? Contains the claims, which are the data being transmitted. This can include user information, roles, and any other relevant data.
//3. Signature: //? To verify that the sender of the JWT is who it claims to be and to ensure that the message wasn't changed along the way. The signature is created by taking the encoded header, encoded payload, a secret key, and the algorithm specified in the header.
