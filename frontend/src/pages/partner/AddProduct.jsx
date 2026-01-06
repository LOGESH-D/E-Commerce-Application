import { useState } from "react";
import api from "../../api/axios.js";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if(!name || !price || !description || !image) {
            alert("All Fields are required");
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image);
        try{
            setLoading(true);
            await api.post("/products", formData, {
              timeout: 20000,
            });
            alert("Product Added Successfully");
            navigate("/partner");
        }catch(error){
            alert(error.response?.data?.message || "Product upload failed");
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form className="space-y-4" onSubmit={submitHandler}>
                <TextField
                    label="Product Name"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Price"
                    type="number"
                    fullWidth
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Add Product"}
                </Button>
            </form>
        </div>
    )
}

export default AddProduct;