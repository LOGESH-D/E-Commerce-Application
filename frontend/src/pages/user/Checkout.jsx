import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import api from "../../api/axios";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    if (!address || !lat || !lng) {
      alert("Please fill all delivery details");
      return;
    }

    const orderData = {
      products: cart.map((item) => ({
        productId: item._id,
        quantity: item.qty,
      })),
      deliveryLocation: {
        address,
        lat: Number(lat),
        lng: Number(lng),
      },
    };

    try {
      setLoading(true);
      await api.post("/orders", orderData);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <h2 className="p-6">Cart is empty</h2>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold">Checkout</h2>

      <TextField
        label="Delivery Address"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <TextField
        label="Latitude"
        fullWidth
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />

      <TextField
        label="Longitude"
        fullWidth
        value={lng}
        onChange={(e) => setLng(e.target.value)}
      />

      <Button
        variant="contained"
        fullWidth
        onClick={placeOrderHandler}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
};

export default Checkout;
