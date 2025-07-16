import mongoose from "mongoose";

// const URI = "mongodb+srv://rajvirdas:passwordCheck1234@cluster0.rhkoxen.mongodb.net/test?retryWrites=true&w=majority";

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
    });
    //console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default connectDb;