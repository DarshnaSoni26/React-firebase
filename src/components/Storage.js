import React, { useState } from "react";
import { storage } from "../config/firebase";
import { ref, uploadBytes } from "firebase/storage";

export default function Storage() {
  const [file, setFile] = useState(null);
  const uploadFile = async () => {
    if (!file) return;
    const folderref = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(folderref, file);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>Storage</h1>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>upload</button>
    </>
  );
}
