import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function AdminDeleteComp() {
  const [event, setevent] = useState([]);
  const [downloads, setDownloads] = useState([]);

  const loadEvent = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get");

      setevent(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading events.");
    }
  };

  useEffect(() => {
    loadEvent();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/api/download").then((response) => {
      setDownloads(response.data);
    });
  }, []);

  const handleDelete = async (event_id) => {
    console.log(event_id);
    await axios
      .get(`http://localhost:3001/api/delete/${event_id}`)
      .then((result) => {
        if (result.data === "Event Deleted") {
          toast.success("Event Deleted");
        }
      });
    window.location.reload();
  };
  const handleFileDelete = async (id) => {
    console.log(id);
    await axios
      .get(`http://localhost:3001/api/filedelete/${id}`)
      .then((result) => {
        if (result.data === "File Deleted") {
          toast.success("File Deleted");
        }
      });
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table class="table text-center mt-5 table-bordered border-dark">
            <thead>
              <tr>
                <th scope="col">Event</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {event.map((item) => {
                return (
                  <tr>
                    <td>
                      <Link
                        to={`/admin_edit/${item.event_id}`}
                        state={item}
                        className="link-dark border border-0"
                      >
                        {item.event_name}
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => handleDelete(item.event_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col">
          <table class="table text-center mt-5 table-bordered border-dark">
            <thead>
              <tr>
                <th scope="col">File</th>
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
                        onClick={() => handleFileDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
