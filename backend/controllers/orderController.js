import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";


export const placeOrder = async (req, res) => {
    try{
        const {products, deliveryLocation} = req.body;
        if(!products || products.length === 0){
            return res.status(400).json({message: "No products in the order"});
        }
        let totalAmount = 0;
        let partnerId = null;
        const orderProducts = [];
        for(let item of products){
            const product = await Product.findById(item.productId);
            if(!product) continue;
            totalAmount += product.price * item.quantity;
            partnerId = product.partner;
            orderProducts.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            });
        }
        const platformEarnings = totalAmount * 0.10;
        const partnerEarnings = totalAmount * 0.83;
        const driverEarnings = totalAmount * 0.07;

        const order = await Order.create({
            user: req.user.id,
            partner: partnerId,
            products: orderProducts,
            totalAmount,
            partnerEarnings,
            driverEarnings,
            platformEarnings,
            deliveryLocation
        });
        res.status(201).json({message: "Order placed successfully", order});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const acceptOrder = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order || order.partner.toString() !== req.user.id){
            return res.status(404).json({message: "Unauthorized"});
        }
        order.orderStatus = "Accepted";
        await order.save();
        res.status(200).json({message: "Order accepted"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const assignDriver = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order || order.orderStatus !== "Accepted"){
            return res.status(400).json({message: "Order order not ready"});
        }
        order.driver = req.user.id;
        order.orderStatus = "Driver Assigned";
        await order.save();
        res.status(200).json({message: "Order assigned to driver"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const updateDeliveryStatus = async (req, res) => {
    try{
        const {status} = req.body;
        const order = await Order.findById(req.params.id);
        if(!order || order.driver.toString() !== req.user.id){
            return res.status(404).json({message: "Unauthorized"});
        }
        order.orderStatus = status;
        if (status === "Delivered"){
            const driver = await User.findById(req.user.id);
            driver.totalEarnings += order.driverEarnings;
            await driver.save();
        }
        await order.save();
        res.status(200).json({message: "Order status updated"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const getMyOrders = async (req, res) => {
    const orders = await Order.find({user: req.user.id});
    res.json(orders);
};

export const cancelOrder = async (req, res) => {
    try{
        const {reason} = req.body;
        if(!reason || reason.trim() === ""){
            return res.status(400).json({message: "Cancellation reason is required"});
        }
        const order = await Order.findById(req.params.id);
        if(!order || order.user.toString() !== req.user.id){
            return res.status(404).json({message: "Unauthorized"});
        }
        if(order.orderStatus === "Out for Delivery" || order.orderStatus === "Delivered"){
            return res.status(400).json({message: "Order cannot be cancelled after delivery has started"});
        }
        const cancellationFine = order.totalAmount * 0.01;
        order.isCancelled = true;
        order.orderStatus = "Cancelled";
        order.cancellationFine = cancellationFine;
        order.cancellationReason = reason;
        order.platformEarnings = 0;
        order.driverEarnings = 0;
        order.platformEarnings += cancellationFine;
        await order.save();
        res.status(200).json({message: "Order cancelled successfully", cancellationFine, cancellationReason: reason});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}