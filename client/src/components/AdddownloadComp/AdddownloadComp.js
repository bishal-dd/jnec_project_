import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdddownloadComp() {
  const [file_name, setFile_name] = useState("");
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    setFile_name(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_name", file_name);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/upload",
        formData
      );
      if (res.data === "file added") {
        toast.success("File added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Form
        onSubmit={handleSubmit}
        className="p-5 rounded-5 border border-3 border-dark"
      >
        <Form.Group controlId="formFileName">
          <Form.Label>File Name</Form.Label>
          <Form.Control
            type="text"
            name="file_name"
            value={file_name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formFile">
          <Form.Label>Choose File</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload} />
        </Form.Group>

        <Button variant="primary" className=" border-0 mt-3" type="submit">
          ADD
        </Button>
      </Form>
    </div>
  );
}
