import mongoose, {Schema} from "express";
import bcrypt from "bcrypt";

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

userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function(){
    return await verifyJWT.sign(
        {
            _id : this._id,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
    return await verifyJWT.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);