import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "ecommerce-app" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      await connectDB();
      const { id, email_addresses, first_name, last_name, image_url } = event.data;

      console.log("🔄 Syncing user to MongoDB:", id);

      // Check if user already exists
      const existingUser = await User.findOne({ clerkId: id });
      if (existingUser) {
        console.log("✅ User already exists in MongoDB:", id);
        return { success: true, message: "User already exists" };
      }

      const newUser = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
        imageUrl: image_url || "",
        addresses: [],
        wishlist: [],
      };

      const createdUser = await User.create(newUser);
      console.log("✅ User created in MongoDB:", createdUser._id);
      
      return { success: true, userId: createdUser._id };
    } catch (error) {
      console.error("💥 Error creating user in MongoDB:", error);
      throw error;
    }
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      await connectDB();
      const { id } = event.data;

      console.log("🗑️ Deleting user from MongoDB:", id);
      
      const result = await User.deleteOne({ clerkId: id });
      
      if (result.deletedCount > 0) {
        console.log("✅ User deleted from MongoDB:", id);
        return { success: true, deletedCount: result.deletedCount };
      } else {
        console.log("⚠️ User not found in MongoDB for deletion:", id);
        return { success: false, message: "User not found" };
      }
    } catch (error) {
      console.error("💥 Error deleting user from MongoDB:", error);
      throw error;
    }
  }
);

export const functions = [syncUser, deleteUserFromDB];
