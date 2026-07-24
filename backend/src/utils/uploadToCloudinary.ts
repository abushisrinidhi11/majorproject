import cloudinary from "../config/cloudinary";
import { Readable } from "stream";
import crypto from "crypto";
import logger from "./logger";

logger.log("Cloudinary Upload Utility Loaded");

interface CloudinaryUploadResult
{
    url: string;
    publicId: string;
}

const uploadToCloudinary = (
    fileBuffer: Buffer,
    folder: string,
    extension: string = "pdf"
): Promise<CloudinaryUploadResult> =>
{
    logger.log("Uploading File To Cloudinary");

    // Cloudinary requires the extension to be part of the public_id
    // itself for "raw" resource types (unlike image/video uploads,
    // where the extension is handled separately). Without this, the
    // delivered URL has no extension and browsers/OS can't recognize
    // the file type, causing it to download as a locked/unreadable file.
    const uniqueFileName =
        Date.now() + "-" + crypto.randomBytes(8).toString("hex") +
        "." + extension;

    return new Promise((resolve, reject) =>
    {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "raw",
                public_id: uniqueFileName,
                use_filename: false,
                unique_filename: false
            },
            (error, result) =>
            {
                if (error)
                {
                    logger.log("Cloudinary Upload Failed");

                    return reject(error);
                }

                logger.log("Cloudinary Upload Successful");

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