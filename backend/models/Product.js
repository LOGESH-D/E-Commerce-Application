import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    platformCommission: {
        type: Number,
        default: 10
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;