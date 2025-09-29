import express from "express";
import { FileController } from "./file-controller";
import { S3Uloader } from "./s3-uploader";
import { ClUploader } from "./cloudinary";

const app = express();

app.get("/file-upload", (req, res) => {
  const uploaderStr = req.query.uploader;

  if (uploaderStr === "s3") {
    const uploader = new S3Uloader("my-s3-bucket");
    new FileController(uploader).upload(req, res);
  } else if (uploaderStr === "cloudinary") {
    const uploader = new ClUploader("my-cloudinary-bucket");
    new FileController(uploader).upload(req, res);
  } else {
    res.status(400).json({ message: "Invalid uploader" });
    return;
  }
});

export default app;
