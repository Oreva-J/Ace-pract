import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ace-next" });

// Inngest function to save user data to the database

export const syncUserData = inngest.createFunction(
  {
    id: "sync-user-with-clerk-v2",
  },
  { event: "clerk/user.created" }, //  Event to trigger the function
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

// Inngest function to update user data in the database
export const syncUpdateUserData = inngest.createFunction(
    {
        id: "update-user-from-clerk-v2",
    },
    { event: "clerk/user.updated" }, // Event to trigger the function
    async({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl: image_url,
        }
        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
)

// Inngest function to delete user data from the database
export const syncDeleteUserData = inngest.createFunction(
    {
        id: "delete-user-with-clerk-v2",
    },
    { event: "clerk/user.deleted" }, // Event to trigger the function
    async({event}) => {
        const {id} = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)

// Inngest function to create user order in the database
export const createUserOrder = inngest.createFunction(
    {
        id: "create-user-order",
        batchEvents: {
          maxSize: 5, // Maximum number of events to process in a single batch
          timeout: '5s', // Maximum time to wait for events before processing
        }
    },
    { event: "order/created" }, // Event to trigger the function
    async({events}) => {
        const orders = events.map((event) => {
          return {
            userId: event.data.userId,
            items: event.data.items,
            amount: event.data.amount,
            address: event.data.address,
            date: event.data.date,
          }
        });

        // Connect to the database
        await connectDB();
        await Order.insertMany(orders);
        
        return { success: true, processed: orders.length };
    }
);