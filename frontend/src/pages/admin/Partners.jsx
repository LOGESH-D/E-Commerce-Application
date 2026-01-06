import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Button } from "@mui/material";

const Partners = () => {
  const [partners, setPartners] = useState([]);

  const fetchPartners = async () => {
    const res = await api.get("/admin/partners/pending");
    setPartners(res.data);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const approvePartner = async (id) => {
    await api.put(`/admin/partner/approve/${id}`);
    fetchPartners();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Partners</h2>

      {partners.length === 0 && <p>No pending partners</p>}

      {partners.map((partner) => (
        <div
          key={partner._id}
          className="border p-4 mb-3 rounded flex justify-between items-center"
        >
          <div>
            <p>
              <b>Name:</b> {partner.name}
            </p>
            <p>
              <b>Email:</b> {partner.email}
            </p>
          </div>

          <Button
            variant="contained"
            onClick={() => approvePartner(partner._id)}
          >
            Approve
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Partners;
