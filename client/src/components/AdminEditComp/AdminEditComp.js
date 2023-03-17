import axios from "axios";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "./admineditcomp.css";
import { FaFileImage } from "react-icons/fa";

function AdminEditComp() {
  const locate = useLocation();
  const item = locate.state;
  const formRef = useRef(null); // define a ref object

  const navigate = useNavigate();

  const handleEdit = async (event_id, e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current); // access the form data using the ref object
    console.log(formData);
    const fileInput = e.target.elements["event_image"][0];
    console.log(fileInput.files);
    try {
      await axios
        .post(`http://localhost:3001/api/edit/${event_id}`, formData)
        .then((event) => {
          if (event.data === "Image size exceeds the limit of 10 MB") {
            toast.error("Size of the image should be less than 10MB");
          } else if (event.data === "event added") {
            toast.success("Event added");
          }
        });
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <h2 class="text-center p-3">Edit an Event</h2>
          <form
            class="rounded-4 p-3 border border-3 border-dark"
            enctype="multipart/form-data"
            id="add_event_form"
            ref={formRef}
            onSubmit={(e) => handleEdit(item.event_id, e)}
          >
            <div class="form-group p-3">
              <label for="eventName">Event Name:</label>
              <input
                type="text"
                class="form-control border-dark border-1"
                id="eventName"
                placeholder="Enter event name"
                defaultValue={item.event_name}
                name="event_name"
                required
              />
            </div>
            <div class="form-group p-3">
              <label for="eventDescription">Event Description:</label>
              <textarea
                class="form-control border-dark border-1"
                id="eventDescription"
                rows="3"
                placeholder="Enter event description"
                name="event_description"
                defaultValue={item.event_description}
              />
            </div>
            <div className="form-group p-3">
              <label htmlFor="eventImage">Event Image:</label>
              <div className="input-group">
                <input
                  type="file"
                  className="form-control-file border-dark border-1"
                  id="eventImage"
                  name="event_image"
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <FaFileImage />
                  </span>
                </div>
              </div>
            </div>
            <div class="form-group p-3">
              <label for="eventDate">Event Date:</label>
              <input
                type="date"
                class="form-control border-dark border-1"
                id="eventDate"
                placeholder="Enter event date"
                name="event_date"
                value={item.event_date}
              />
            </div>
            <div class="form-group p-3">
              <label for="eventLink">Event Link:</label>
              <input
                type="url"
                class="form-control border-dark border-1"
                id="eventLink"
                placeholder="Enter event link"
                name="event_link"
                defaultValue={item.event_link}
              />
            </div>
            <div class="p-2 text-center" id="button_div">
              <button type="submit" class="btn  border-dark border-0">
                Edit Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditComp;
