import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["user", "partner", "driver", "admin"],
        default: "user"
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    totalEarnings: {
        type: Number,
        default: 0
    },
    location: {
        lat: {
            type: Number,
            default: null
        },
        lng: {
            type: Number,
            default: null
        }
    }
},{timestamps: true});

export default mongoose.model("User", userSchema);