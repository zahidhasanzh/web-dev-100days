import { Request, Response } from "express";

interface Uploader {
  upload: (filename: string) => Promise<boolean>;
}

export class FileController {
  constructor(private uploader: Uploader) {}
  upload(req: Request, res: Response) {
    this.uploader.upload("test.mp4");
    res.json({ message: "Hello world!" });
  }
}
