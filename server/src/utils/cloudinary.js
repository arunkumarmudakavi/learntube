import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    // console.log(response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const uploadVideoCloudinary = async (localVideoPath) => {
  try {
    if (!localVideoPath) return null;
    console.log("29: ",localVideoPath);

    const response = await cloudinary.uploader.upload(localVideoPath, {
      resource_type: "video",
      chunk_size: 6000000,
    })
    // console.log(response?.url);
    fs.unlinkSync(localVideoPath);
    return response;
  } catch (error) {
    fs.unlinkSync(localVideoPath);
    return null;
  }
};

export { uploadImageCloudinary, uploadVideoCloudinary };
