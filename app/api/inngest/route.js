import { inngest, syncDeleteUserData, syncUpdateUserData, syncUserData } from "@/config/inngest";
import { serve } from "inngest/next";
// import { inngest } from "../../../inngest/client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    // syncUserData,
    syncUserData,
    // syncUpdateUserData,
    syncUpdateUserData,
    // syncDeleteUserData,
    syncDeleteUserData
  ],
});
// This is a special function that will be called when the server starts