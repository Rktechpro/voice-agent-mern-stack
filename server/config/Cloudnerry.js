import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadCloudinary = async (filePath) => {
  // cloudinary.config({
  //   cloud_name: "hackbots",
  //   api_key: "953583951256821",
  //   api_secret: "NRv50GBdPwhCDq7lYUOWt3WIiOs",
  
  // });

  cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
  });
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath); // Delete local file after upload
    console.log(uploadResult);
    return uploadResult.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath); // Still clean up local file
    console.log(error);
  }
};
export default uploadCloudinary;
