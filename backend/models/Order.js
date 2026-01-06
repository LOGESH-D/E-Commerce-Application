import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    products: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount:{
        type: Number,
        required: true
    },
    partnerEarnings: Number,
    driverEarnings: Number,
    platformEarnings: Number,
    isCancelled: {
        type: Boolean,
        default: false
    },
    cancellationFine: {
        type: Number,
        default: 0
    },
    cancellationReason: {
        type: String,
        default: ""
    },
    orderStatus: {
        type: String,
        enum: [
            "Placed",
            "Accepted",
            "Driver Assigned",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        default: "Placed"
    },
    deliveryLocation: {
        lat: Number,
        lng: Number,
        address: String
    }
},{timestamps: true});

export default mongoose.model("Order", orderSchema);