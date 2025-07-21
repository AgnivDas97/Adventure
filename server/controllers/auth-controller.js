//"action" is the descriptiono of what you want to do, while
//"dispatch" is the function that carries out that action.

//? IN an Express.js application, the controller is a function that handles the request and response objects. It contains the logic for processing the request, interacting with the model (database), and sending a response back to the client. The controller is responsible for defining the behavior of the application when a specific route is accessed.
//? MVC (Model-View-Controller) is a software architectural pattern that separates an application into three main components: Model, View, and Controller. This separation allows for better organization of code, easier maintenance, and improved scalability. In the context of a web application, the Model represents the data and business logic, the View is responsible for the user interface, and the Controller acts as an intermediary between the Model and View, handling user input and updating the View accordingly.


//------------------ controller---------------------
 
import User from '../models/user-model.js'; // Import the User model
//import bcrytpt from 'bcrypt'; // Import bcrypt for password hashing


//#region Home page logic
const home = (req, res) => {
    try {
        res.status(200).send('API connected');
    } catch (error) {
        console.error('Error in home controller:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//#endregion

//#region Register page logic

const register = async (req, res) => {
    try {
        const { name, email, password, phone, profilePhoto } = req.body;
        //steps1: Validate the request body
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        //steps2: Check if the user already exists
        const existingUser = await User.findOne({ email:email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //////steps3: Hash the password
        //// const hashedPassword = await bcrytpt.hash(password, 10); // Hash the password with a salt rounds of 10

        const userCreated = await User.create({
            name:name,
            email:email,
            password:password,
            phone:phone,
            profilePhoto:profilePhoto
        });
        //console.log(userCreated,"userCreated register")
        res.status(201).json({ 
            message: 'Registration Successful',  
            token : await userCreated.generateToken(),userId:userCreated._id.toString() 
        }); // Send the created user as a response
        //console.log("user created sucessfully")
    } catch (error) {
        console.error('Error in register controller:', error);
        // res.status(500).json({ message: 'Internal server error' });
        const getError={
            statu: 500,
            message: error.errors[0].message, // Extract the error message from the validation error
            extraDetails: error.errors, // Include extra details about the validation error
        };
        next(getError); // Pass the error to the next middleware
    }
};
//#endregion

//#region Login page logic

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //steps1: Validate the request body
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        //steps2: Check if the user exists
        const existingUser = await User.findOne({ email:email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //steps3: Compare the password
        // const isPasswordValid = await bcrypt.compare(password, existingUser.password) //existingUser.comparePassword(password);
        const user =  await existingUser.comparePassword(password)
        //console.log(user)

        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await existingUser.generateToken();

        res.cookie("jwtoken", token, {
            expires:new Date(Date.now() + 25892000000),
            httpOnly:true,
            secure: true,
            sameSite: 'Strict'
        })


        res.status(201).json({ 
            message: 'Login Successful', 
            token : token, 
            userId: existingUser._id.toString() 
        }); // Send the created user as a response
    } catch (error) {
        console.error('Error in login controller:', error);
        // res.status(500).json({ message: 'Internal server error' });
        const getError={
            statu: 500,
            message: error.errors[0].message, // Extract the error message from the validation error
            extraDetails: error.errors, // Include extra details about the validation error
        };
        next(getError);
        // next(error); // Pass the error to the next middleware
    }
}
//#endregion

export default  { home , register , login };