import ImageKit from "imagekit";
import { config } from "../configs/config.js";

const imagekit = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
});

export const uploadFile = async ({ buffer, fileName, folder = "humman_ai" }) => {
    try {
        const response = await imagekit.upload({
            file: buffer,          // buffer or base64
            fileName: fileName,
            folder: folder
        });

        return response;
    } catch (error) {
        console.log("❌ Image upload error:", error);
        throw error;
    }
};