import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./admineventcomp.css";
import { FaFileImage } from "react-icons/fa";

function AdminEventComp() {
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

    if (state.event_description.length < 150) {
      toast.error("Event description must be at least 150 characters long.");
      return;
    }

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
          if (event.data === "Image size exceeds the limit of 10 MB") {
            toast.error("Size of the image should be less than 10MB");
          } else if (event.data === "event added") {
            toast.success("Event added");
          }
        });
      setState(initialState);

      navigate("/adminevents");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.get("http://localhost:3001/api/adminlogout").then((sess) => {
        if (sess.data === "logout sucess") {
          navigate("/adminlogin");
        }
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "event_image") {
      setState({ ...state, [name]: files[0] });
    } else if (name === "event_date") {
      setState({ ...state, [name]: value });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const { event_name, event_description, event_image, event_date, event_link } =
    state;

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <h2 class="text-center p-3">Create an Event</h2>
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
                name="event_name"
                value={event_name}
                onChange={handleChange}
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
                value={event_description}
                onChange={handleChange}
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
                  onChange={handleChange}
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
                value={event_date}
                onChange={handleChange}
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
                value={event_link}
                onChange={handleChange}
              />
            </div>
            <div class="p-2 text-center" id="button_div">
              <button
                type="submit"
                class="btn  border-dark border-0"
                onClick={handleSubmit}
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-1 d-flex p-4 ">
          <span>
            <button
              class="btn btn-secondary pr-2"
              onClick={onLogout}
              id="logout_button"
            >
              Logout
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminEventComp;
