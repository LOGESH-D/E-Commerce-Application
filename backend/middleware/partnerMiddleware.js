const isPartner = (req, res, next) => {
    if(req.user.role === "partner"){
        next();
    }
    else{
        res.status(403).json({ message: "Access denied. Partner role required." });
    }
}

export default isPartner;