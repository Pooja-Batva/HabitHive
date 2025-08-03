import mongoose, {Schema} from "mongoose";

const notificationSchema = Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        type : {
            type : String,
            enum : ["dailyReminder", "weeklySummary"]
        }
    },
    {
        timestamps : true,
    }
);

export const Notification = mongoose.model("Notification", notificationSchema);