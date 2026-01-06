import User from "../models/User.js";
import Order from "../models/Order.js";
import calculateDistance from "../utils/calculateDistance.js";


export const updateDriverLocation = async (req, res) => {
    try{
        const {lat, lng} = await req.body;
        if(!lat || !lng){
            return res.status(400).json({message: "Location are required"});
        }
        const driver = await User.findById(req.user._id);
        driver.location = {lat, lng};
        await driver.save();
        res.status(200).json({message: "Location updated successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const getNearbyOrders = async (req, res) => {
    try{
        const driver = await User.findById(req.user._id);
        if(!driver.location || !driver.location.lat || !driver.location.lng){
            return res.status(400).json({message: "Driver location not found. Please update your location first."});
        }
        const orders = await Order.find({
            orderStatus: "Accepted",
            driver: null,
            isCancelled: false
        });
        const nearbyOrders = orders.map((order) => {
            const distance = calculateDistance(
                driver.location.lat,
                driver.location.lng,
                order.deliveryLocation.lat,
                order.deliveryLocation.lng
            );
            return {
                order,
                distance
            };
        }).filter((item) => item.distance <= 10).sort((a, b) => a.distance - b.distance);
        res.status(200).json(nearbyOrders);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}