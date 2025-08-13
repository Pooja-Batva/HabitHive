import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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
        },
        refreshToken : {
            type : String
        }
    },
    {
        timestamps : true,
    }
);

userSchema.pre('save', async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function(){
    const token =  await jwt.sign(
        {
            _id : this._id,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    );

    // console.log("access token :" , token);
    return token;
}

userSchema.methods.generateRefreshToken = async function(){
    const token = await jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    );

    // console.log("refresh token :" , token);
    return token;
}

export const User = mongoose.model("User", userSchema);