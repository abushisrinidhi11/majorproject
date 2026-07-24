import dotenv from "dotenv";
dotenv.config();
export const env={
    PORT:Number(process.env.PORT)||5000,
    MONGODB_URI:process.env.MONGODB_URI as string,
    JWT_SECRET:process.env.JWT_SECRET as string,
    NODE_ENV:process.env.NODE_ENV||"development",
    CLIENT_URL:process.env.CLIENT_URL||"http://localhost:5173",
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET as string
};