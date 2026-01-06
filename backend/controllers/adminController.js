import User from "../models/User.js";

export const getPendingPartners = async (req, res) => {
    try{
        const partners = await User.find({
            role: "partner",
            isApproved: false
        }).select("-password");
        res.status(200).json(partners);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const getPendingDrivers = async (req, res) => {
    try{
        const drivers = await User.find({
            role: "driver",
            isVerified: false
        }).select("-password");
        res.json(drivers);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const approvePartner = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id);
        if(!user || user.role !== "partner"){
            return res.status(404).json({ message: "Partner not found" });
        }
        user.isApproved = true;
        await user.save();
        res.json({ message: "Partner approved successfully" });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

export const approveDriver = async (req, res) => {
    try{
        const user = await User.findById(req.params.is);
        if(!user || user.role !== "driver"){
            return res.status(404).json({ message: "Driver not found" });
        }
        user.isApproved = true;
        await user.save();
        res.json({ message: "Driver approved successfully" });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}