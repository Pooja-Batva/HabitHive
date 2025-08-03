import mongoose, {Schema} from "express";

const userSchema = Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true
        },
        password : {  //Hashed password store using bcypt
            type : String,
            required : true
        },
        avatar : {
            type : String, //cloudinary url
        },
        friends : [
            {
                type : Schema.Types.ObjectId,
                ref : 'User'
            }
        ],
        habits : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Habit'
            }
        ],
        isShared : {
            type : Boolean
        }
    },
    {
        timestamps : true,
    }
);

export const User = mongoose.model("User", userSchema);