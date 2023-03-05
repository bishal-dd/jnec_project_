/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./eventcomp.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EventComp() {
  const [event, setevent] = useState([]);

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
  return (
    <>
      <div id="event-page" class="py-5">
        <div class="container">
          <div class="row mt-4">
            {event.map((item, index) => {
              return (
                <div className="col mt-3">
                  <div class="card">
                    <img
                      class="card-img-top"
                      src={item.event_image}
                      alt="Card image cap"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{item.event_name}</h5>
                      <span className="">{item.event_date}</span>
                      <p class="card-text">{item.event_description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div class="row">
            <div class="col">
              <Link to="/events" class="text-dark" id="view_link">
                View all--
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
