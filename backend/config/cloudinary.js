import cloudinary from "cloudinary";

let isConfigured = false;

const connectCloudinary = () => {
  if (isConfigured) return;

  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  isConfigured = true;

  console.log("Cloudinary configured successfully");
};

export { cloudinary, connectCloudinary };
