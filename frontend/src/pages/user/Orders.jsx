import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const res = await api.get("/orders/my-orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const canCancel = (status) => {
    return (
      status === "Placed" ||
      status === "Accepted" ||
      status === "Driver Assigned"
    );
  };

  const openCancelDialog = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleCancel = async () => {
    if (!reason.trim()) {
      alert("Cancellation reason is required");
      return;
    }

    try {
      await api.put(`/orders/${selectedOrder._id}/cancel`, {
        reason,
      });

      setOpen(false);
      setReason("");
      setSelectedOrder(null);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div key={order._id} className="border rounded p-4 space-y-2">
          <p>
            <b>Status:</b> {order.orderStatus}
          </p>

          <p>
            <b>Total:</b> ₹{order.totalAmount}
          </p>

          <p>
            <b>Delivery Address:</b> {order.deliveryLocation?.address}
          </p>

          {order.isCancelled && (
            <p className="text-red-600">
              Cancelled (Fine: ₹{order.cancellationFine})
            </p>
          )}

          {canCancel(order.orderStatus) && !order.isCancelled && (
            <Button
              color="error"
              variant="outlined"
              onClick={() => openCancelDialog(order)}
            >
              Cancel Order
            </Button>
          )}
        </div>
      ))}

      {/* ================= CANCEL DIALOG ================= */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cancel Order</DialogTitle>

        <DialogContent className="space-y-2">
          <p className="text-sm text-gray-600">
            A <b>1% cancellation fine</b> will be applied.
          </p>

          <TextField
            label="Cancellation Reason"
            fullWidth
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Back</Button>
          <Button color="error" onClick={handleCancel}>
            Confirm Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
