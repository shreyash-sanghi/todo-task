import mongoose from "mongoose";
import { envProvider } from "../constants/env.constants.js";

// Connection Events
mongoose.connection.on("connected", () => {
    console.log("MongoDB is connected", mongoose.connection.readyState);
});
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB is disconnected", mongoose.connection.readyState);
});
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error", error?.message);
    throw new Error(error);
});


// Connect Function with Connection Pooling
export const connectDB = async () => {
    try {
        await mongoose.connect(envProvider.dburi, {
            dbName: "todoDataBase",
            maxPoolSize: 10,
            minPoolSize: 5,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        });
    } catch (error) {
        throw new Error(error);
    }
};
