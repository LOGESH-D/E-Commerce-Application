import {Link} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";
import {Button} from "@mui/material";

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);

    return(
        <>
            <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
                <Link to="/" className="text-xl font-bold">E-Commerce</Link>
                <div className="space-x-4">
                    {!user && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                    {user && (
                        <>
                            <span className="capitalize">{user.role}</span>
                            <Button variant="contained" color="error" onClick={logout}>Logout</Button>
                        </>
                    )}
                </div>
            </nav>

        </>
    )
}

export default Navbar;