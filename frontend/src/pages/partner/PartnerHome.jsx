import { Link } from "react-router-dom";

const PartnerDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Partner Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/partner/add-product"
          className="border p-4 rounded hover:bg-gray-100"
        >
          Add New Product
        </Link>

        <Link
          to="/partner/my-products"
          className="border p-4 rounded hover:bg-gray-100"
        >
          My Products
        </Link>
      </div>
    </div>
  );
};

export default PartnerDashboard;
