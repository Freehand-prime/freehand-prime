// React-Dropzone-S3
import DropzoneS3Uploader from "react-dropzone-s3-uploader";

export default function S3Uploader({ addCardData, setAddCardData, image }) {
  // S3 details
  const uploadOptions = { server: "http://localhost:5000" };
  const s3Url = "https://freehand-prime.s3.amazonaws.com";

  // On upload handler
  const handleFinishedUpload = (info) => {
    console.log("File uploaded with filename", info.filename);
    console.log("Access it on s3 at", info.fileUrl);
    if (image === "front") {
      setAddCardData({ ...addCardData, image_front: info.fileUrl });
    } else {
      setAddCardData({ ...addCardData, image_inside: info.fileUrl });
    }
  };

  return (
    <DropzoneS3Uploader
      onFinish={handleFinishedUpload}
      s3Url={s3Url}
      maxSize={1024 * 1024 * 5}
      upload={uploadOptions}
    />
  );
}
