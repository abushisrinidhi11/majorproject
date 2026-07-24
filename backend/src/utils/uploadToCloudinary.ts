import cloudinary from "../config/cloudinary";
import { Readable } from "stream";
console.log("Cloudinary Upload Utility Loaded");
interface CloudinaryUploadResult
{
    url: string;
    publicId: string;
}
const uploadToCloudinary=(
    fileBuffer: Buffer,
    folder: string
): Promise<CloudinaryUploadResult> =>
{
    console.log("Uploading File To Cloudinary");
    return new Promise((resolve, reject) =>
    {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "raw"
            },
            (error, result) =>
            {
                if (error)
                {
                    console.log("Cloudinary Upload Failed");

                    return reject(error);
                }
                console.log("Cloudinary Upload Successful");
                resolve({
                    url: result!.secure_url,
                    publicId: result!.public_id
                });
            }
        );

        Readable.from(fileBuffer).pipe(uploadStream);
    });
};
export default uploadToCloudinary;