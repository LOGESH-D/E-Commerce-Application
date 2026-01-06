import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Button } from "@mui/material";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProducts = async () => {
    try {
      const res = await api.get("/products/my-products");
      setProducts(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const deleteProductHandler = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="p-6">No products added yet</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-3 space-y-2">
            <img
              src={product.image.url}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />

            <p className="font-semibold">{product.name}</p>
            <p>₹{product.price}</p>

            <p
              className={`text-sm ${
                product.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.isActive ? "Active" : "Inactive"}
            </p>

            <Button
              color="error"
              variant="outlined"
              fullWidth
              onClick={() => deleteProductHandler(product._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
