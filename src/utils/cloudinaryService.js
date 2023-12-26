import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOncCloudinary = async (localFilePath) => {
  try {
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been successfully uploaded;
    console.log("file successfully uploaded", resonse);
    return response;
  } catch (error) {
    // remove the locally file saved
    fs.unlinkSync(localFilePath);
    return null;
  }
};
export { uploadOncCloudinary };
