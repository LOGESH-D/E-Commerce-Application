import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Button } from "@mui/material";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/admin/all");
      setProducts(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleStatus = async (id) => {
    try {
      await api.put(`/products/admin/toggle/${id}`);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Action failed");
    }
  };

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Products (Admin)</h2>

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

            <p className="text-sm">
              Partner: <b>{product.partner?.name || "Unknown"}</b>
            </p>

            <p
              className={`text-sm font-semibold ${
                product.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.isActive ? "ACTIVE" : "INACTIVE"}
            </p>

            <Button
              variant="contained"
              color={product.isActive ? "error" : "success"}
              fullWidth
              onClick={() => toggleStatus(product._id)}
            >
              {product.isActive ? "Disable" : "Enable"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
