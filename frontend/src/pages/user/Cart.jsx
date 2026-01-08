import { Button } from "@mui/material";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return <p className="p-6">Your cart is empty</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>
                ₹{item.price} × {item.qty}
              </p>
            </div>

            <Button color="error" onClick={() => removeFromCart(item._id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-4 font-bold">Total: ₹{total}</p>

      <Button
        variant="contained"
        color="success"
        fullWidth
        className="mt-4"
        onClick={clearCart}
      >
        Checkout (Next)
      </Button>
    </div>
  );
};

export default Cart;
