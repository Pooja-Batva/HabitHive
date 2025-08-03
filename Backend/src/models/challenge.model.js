import mongoose, {Schema} from "mongoose";

const challengeSchema = Schema(
    {
        name : {
            type : String,
            required : trusted,
        },
        desc : {
            type : String
        },
        creator : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        duration : {
            type : Number  //in days
        },
        isPublic : {
            type : Boolean,
        },
        start : {
            Type : Date
        },
        participates : [
            {
                type : Schema.Types.ObjectId,
                ref : "User"
            }
        ]
    },
    {
        timestamps : true,
    }
);

export const Challenge = mongoose.model("Challenge", challengeSchema);