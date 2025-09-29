export class ClUploader {
  constructor(private bucket: string) {}
  async upload(filename: string) {
    //upload the file to s3
    console.log(`Uploading ${filename} to cloudinary in bucket ${this.bucket}`);
    return true;
  }
}
