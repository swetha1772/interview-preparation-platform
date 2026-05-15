import { useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);

  const handleUpload = async () => {

    if (!file) {
      alert("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData
      );

      setSkills(response.data.skills);

    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>AI Interview Preparation Platform</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload Resume
      </button>

      <h2>Detected Skills</h2>

      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;