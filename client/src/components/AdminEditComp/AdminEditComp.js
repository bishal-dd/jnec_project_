import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import "./admineditcomp.css";
import { FaFileImage } from "react-icons/fa";

function AdminEditComp() {
  const locate = useLocation();
  const item = locate.state;

  const handleEdit = async (event_id, e) => {
    e.preventDefault();
    const form = document.querySelector("#add_event_form");
    const formData = new FormData(form);

    const event = {
      event_name: formData.get("event_name"),
      event_description: formData.get("event_description"),
      event_image: formData.get("event_image"),
      event_date: formData.get("event_date"),
      event_link: formData.get("event_link"),
    };
    await axios
      .post(`http://localhost:3001/api/edit/${event_id}`, event)
      .then((result) => {
        if (result.data === "event edited") {
          toast.success("Event Edited");
        }
      });
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
                  src={item.event_image}
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
              <button
                class="btn  border-dark border-0"
                onClick={(e) => handleEdit(item.event_id, e)}
              >
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
