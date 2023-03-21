import React from "react";
import "./adminpathcomp.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminPathComp() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5 p-">
        <div className="col-md-4 mt-5">
          <Link to="/adminevents" className="text-decoration-none">
            <Card className="card1 h-500 w-100 " id="admin_card">
              <Card.Body className="d-flex flex-column justify-content-center text-center btn">
                Create Event
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="col-md-4 mt-5">
          <Link to="/admin_delete" className="text-decoration-none">
            <Card className="card1 h-500 w-100 " id="admin_card">
              <Card.Body className="d-flex flex-column justify-content-center text-center btn">
                Delete/Edit
              </Card.Body>
            </Card>
          </Link>
        </div>
        <div className="col-md-4 mt-5">
          <Link to="/adddownloads" className="text-decoration-none">
            <Card className="card1 h-500 w-100" id="admin_card">
              <Card.Body className="d-flex flex-column justify-content-center text-center btn">
                Add File
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
