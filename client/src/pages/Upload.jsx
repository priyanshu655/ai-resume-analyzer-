import { useState } from "react";
import API from "../services/api";

function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await API.post("/resume/analyze", formData);
      console.log(res.data);
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Analyze</button>
    </div>
  );
}

export default Upload;