import multer from "multer";
console.log("Configuring Multer");
const storage = multer.memoryStorage();
const fileFilter = (
    req: any,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback) =>
    {
        console.log("Checking Uploaded File");
        if (file.mimetype === "application/pdf")
            {
                console.log("PDF File Accepted");
                callback(null, true);
            }
        else
        {
            console.log("Invalid File Type");
        callback(new Error("Only PDF files are allowed"));
    }
};
const upload = multer({
    storage,
    limits:
    {
        fileSize:5*1024*1024
    },
    fileFilter
});
console.log("Multer Configured");
export default upload;