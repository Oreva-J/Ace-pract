/**
 * Establishes a cached connection to the MongoDB database using Mongoose.
 * Utilizes a global cache to prevent multiple connections during hot reloads in development.
 * 
 * @module config/db
 * @requires mongoose
 * 
 * @typedef {Object} CachedConnection
 * @property {import('mongoose').Connection|null} conn - The active Mongoose connection instance.
 * @property {Promise<import('mongoose').Connection>|null} promise - The promise resolving to the Mongoose connection.
 * 
 * @function connectDB
 * @async
 * @description
 * Connects to the MongoDB database specified by the `MONGODB_URI` environment variable,
 * appending the `/ace` database name. If a connection already exists in the global cache,
 * it returns the cached connection. Otherwise, it creates a new connection and caches it.
 * 
 * @returns {Promise<import('mongoose').Connection>} The established Mongoose connection.
 * 
 * @throws {Error} If the connection to MongoDB fails.
 * 
 * @example
 * import connectDB from './config/db';
 * 
 * async function handler(req, res) {
 *   await connectDB();
 *   // Your database operations here
 * }
 */
import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/ace`, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
    
}

export default connectDB;

