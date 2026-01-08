import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Button } from "@mui/material";
import { useCart } from "../../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-3 rounded space-y-2">
            <img
              src={product.image.url}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />

            <p className="font-semibold">{product.name}</p>
            <p>₹{product.price}</p>

            <Button
              variant="contained"
              fullWidth
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
