import React, { useState } from "react";
import { uploadFile } from "../utils/axiosInstance";
import Image from "next/image";
import { Button, Spinner } from "react-bootstrap";

const CustomImageUploader = ({ onImageUpload, label = "Upload Image" }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loader, setLoader] = useState(false);

  const uploadtoServer = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    return await uploadFile(formdata);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoader(true);
      const imageurl = await uploadtoServer(file);

      setImagePreview(imageurl);
      setLoader(false);
      if (onImageUpload) {
        onImageUpload(file); // Pass file to parent if callback is provided
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      setLoader(true);
      const imageurl = uploadtoServer(file);
      setImagePreview(imageurl);
      setLoader(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center", // Vertically centers the items
          gap: "20px", // Adds spacing between the elements
        }}>
        <div
          style={{
            border: dragging ? "2px dashed #007bff" : "2px dashed #ccc",
            borderRadius: "8px",
            padding: "20px",
            width: "200px",
            textAlign: "center",
            cursor: "pointer",
            color: dragging ? "#007bff" : "#666",
            fontFamily: "Arial, sans-serif",
            transition: "border-color 0.3s ease",
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}>
          <p>{label}</p>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div>
          {loader && (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            </Button>
          )}
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              width={100}
              height={100}
              style={{
                // marginTop: "15px",
                maxWidth: "100px",
                height: "100px",
                borderRadius: "15px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CustomImageUploader;
