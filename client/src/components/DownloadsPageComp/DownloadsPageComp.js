import React, { useState, useEffect } from "react";
import "./downloadpagecomp.css";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function DownloadsPageComp() {
  const [downloads, setDownloads] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/download").then((response) => {
      setDownloads(response.data);
    });
  }, []);

  const handleDownload = (fileName) => {
    axios({
      url: `http://localhost:3001/api/downloadfile/${fileName}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        console.log(response.data);
        const fileData = new Blob([response.data], {
          type: "application/pdf",
        });
        console.log(fileData);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(fileData);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error downloading file");
      });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Downloads</h1>
      <Row>
        {downloads.map((file, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{file.file_name}</Card.Title>

                <Button
                  variant="primary"
                  onClick={() => handleDownload(file.file_name)}
                >
                  Download
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
