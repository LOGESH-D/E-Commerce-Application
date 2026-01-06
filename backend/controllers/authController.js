import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const registerUser = async (req, res) => {
    try{
        const { name, email, password, role} = req.body;
        if(role === "admin"){
            return res.status(403).json({message: "Admin registration not allowed"});
        }
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
            isApproved: role === "partner" || role === "driver" ? false : true
        });
        res.status(201).json({
            message: "User registered successfully",
            approvalRequired: user.role === "partner" || user.role === "driver"
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL){
            if(password !== process.env.ADMIN_PASSWORD){
                return res.status(200).json({message: "Invalid Login Credentials"});
            }
            const token = generateToken({id: "admin_id", role: "admin"});
            return res.json({
                token,
                user: {
                    id: "admin",
                    name: "admin",
                    email,
                    role: "admin"
                }
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid Login Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Login Credentials"});
        }
        if((user.role === "partner" || user.role === "driver") && !user.isApproved){
            return res.status(403).json({message: "Account pending approval"});
        }
        const token = generateToken({id: user._id, role: user.role});
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}