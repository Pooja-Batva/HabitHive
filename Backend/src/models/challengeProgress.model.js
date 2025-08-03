import mongoose, {Schema} from "mongoose";

const challengeProgressSchema = Schema(
    {
        challenge : {
            type : Schema.Types.ObjectId,
            ref : "Challenge"
        },
        user : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },
        log : [{
            type : Date,
            completed : Boolean
        }],
        streak : Number,
        joinedAt : Date
    },
    {
        timestamps : true,
    }
);

export const ChallengeProgress = mongoose.model("ChallengeProgress", challengeProgressSchema);