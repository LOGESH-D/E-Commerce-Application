import { React, useEffect, useState } from "react";
import api from "../../api/axios.js";
import { useCart } from "../../context/CartContext.jsx";
import { Button, Card, CardContent } from "@mui/material";

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product._id}>
          <img
            src={product.image.url}
            alt={product.name}
            className="h-48 w-full object-cover"
          />
          <CardContent>
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>

            <p className="mt-2 font-semibold">${product.price}</p>
            <Button
              variant="contained"
              className="mt-3"
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserHome;
