import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./adminlogincomp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLoginComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/adminlogin", {
        username,
        password,
      })
      .then((user) => {
        console.log(user.data);
        if (user.data === "login sucess") {
          navigate("/admineventsrfffs");
        } else {
          toast.error("Invalid username or password");
        }
      });
  };

  return (
    <Container>
      <Container id="main-container" class="admin-form text-center py-1">
        <h1 class="text-center py-2">Admin Login</h1>
        <Form class="rounded-5 p-5   text-center" onSubmit={handleLogin}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              class="form-control"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label class="text-center p-2">Password</Form.Label>
            <Form.Control
              class="form-control"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div class="d-grid  py-4 ">
            <Button variant="primary bg-success" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
