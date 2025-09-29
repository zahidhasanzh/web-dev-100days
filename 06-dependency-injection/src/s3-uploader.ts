export class S3Uloader {
  constructor(private bucket: string) {}
  async upload(filename: string) {
    //upload the file to s3
    console.log(`Uploading ${filename} to s3 in bucket ${this.bucket}`);
    return true;
  }
}
