import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./admineventcomp.css";

export default function AdminEventComp() {
  const initialState = {
    event_name: "",
    event_description: "",
    event_image: null,
    event_date: "",
    event_link: "",
  };

  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("event_name", state.event_name);
    formData.append("event_description", state.event_description);
    formData.append("event_link", state.event_link);
    formData.append("event_image", state.event_image);
    formData.append("event_date", state.event_date);

    try {
      await axios
        .post("http://localhost:3001/api/post", formData)
        .then((event) => {
          if (event.data === "event added") {
            toast.success("Event added");
          }
        });
      setState(initialState);

      navigate("/adminevents");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "event_image") {
      setState({ ...state, [name]: files[0] });
    } else if (name === "event_date") {
      const [year, month, day] = value.split("-"); // split the input value into year, month, and day
      const formattedDate = `${day}/${month}/${year}`; // format the date as dd/mm/yyyy
      setState({ ...state, [name]: formattedDate });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { event_name, event_description, event_image, event_link } = state;

  return (
    <div className="container">
      <div id="event-container">
        <div className="row justify-content-center">
          <div className="col">
            <h2 className="text-center p-3">Create an Event</h2>
            <form class="rounded-4 p-5" encType="multipart/form-data">
              <div className="form-group mb-2">
                <label htmlFor="eventName">Event Name:</label>
                <input
                  type="text"
                  className="rounded py-2 form-control"
                  id="eventName"
                  placeholder="Enter event name"
                  name="event_name"
                  value={event_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="eventDescription">Event Description:</label>
                <textarea
                  className="rounded py-2 form-control"
                  id="eventDescription"
                  rows="3"
                  placeholder="Enter event description"
                  name="event_description"
                  value={event_description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="eventImage">Event Image:</label>
                <input
                  type="file"
                  className="py-2 form-control-file"
                  id="eventImage"
                  name="event_image"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="eventLink">Event Link:</label>
                <input
                  type="url"
                  className="rounded py-2 form-control"
                  id="eventLink"
                  placeholder="Enter event link"
                  name="event_link"
                  value={event_link}
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid py-2">
                <button
                  type="submit"
                  className="btn bg-success py-2"
                  onClick={handleSubmit}
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
