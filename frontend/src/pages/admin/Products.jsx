import { useEffect, useState } from "react";
import api from "../../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-3 space-y-2">
            <img
              src={product.image.url}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />

            <p>
              <b>Name:</b> {product.name}
            </p>
            <p>
              <b>Price:</b> ₹{product.price}
            </p>
            <p className="text-sm text-gray-600">
              <b>Partner:</b> {product.partner?.name}
            </p>
            <p className="text-xs text-gray-500">Product ID: {product._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
