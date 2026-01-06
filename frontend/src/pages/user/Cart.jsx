import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQty } = useContext(CartContext);
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if(cart.length === 0){
        return <h2 className="p-6">Your cart is empty</h2>
    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.map((item) => (
                <div key={item._id} className="flex items-center justify-between mb-4">
                    <div>
                        <h3>{item.name}</h3>
                        <p>${item.price}</p>
                    </div>
                    <TextField type="number" value={item.qty} onChange={(e) => updateQty(item._id, Number(e.target.value))}/>
                    <Button color="error" onClick={() => removeFromCart(item._id)}>Remove</Button>
                </div>
            ))}
            <h3 className="mt-6 font-bold">Total: ${total}</h3>
            <Button variant="contained" className="mt-4" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
        </div>
    );
};

export default Cart;