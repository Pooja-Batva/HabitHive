import mongoose, {Schema} from "mongoose";

const habitLogSchema = Schema(
    {
        habit : {
            type : Schema.Types.ObjectId,
            ref : "Habit"
        },
        date : {
            type : Date,
        },
        completed : {
            type : Boolean,
            default : false
        }
    },
    {
        timestamps : true,
    }
);

export const HabitLog = mongoose.model("HabitLog", habitLogSchema);