import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/partners"
          className="border p-4 rounded hover:bg-gray-100"
        >
          Manage Partners
        </Link>

        <Link
          to="/admin/products"
          className="border p-4 rounded hover:bg-gray-100"
        >
          View Products
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
