import mongoose, {Schema} from "mongoose";

const habitSchema = Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        name : {
            type : String,
            required : true,
        },
        frequency : {
            type : String,
            enum : ["daily", "custome"]
        },
        streak : {
            type : Number
        },
        startDate : {
            type : Date
        },
        lastCompleted : {
            type : Date
        }
    },
    {
        timestamps : true,
    }
);

export const Habit = mongoose.model("Habit", habitSchema);