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
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <table class="table text-center mt-5 table-bordered border-dark">
            <thead>
              <tr>
                <th scope="col">File_Name</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {downloads.map((item) => {
                return (
                  <tr>
                    <td>{item.file_name}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => handleDownload(item.file_name)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}
