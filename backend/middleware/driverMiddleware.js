const isDriver = (req, res, next) => {
    if(req.user.role === "driver"){
        next();
    }
    else{
        res.status(403).json({message: "Access denied, drivers only"});
    }
};

export default isDriver;