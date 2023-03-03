/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EventPageComp() {
  const [event, setevent] = useState([]);

  const loadEvent = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getall");
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
    <div>
      <div class="container">
        <div class="row gy-3">
          {event.map((item, index) => {
            return (
              <div class="col" key={item.id}>
                <div class="card">
                  <div class="col-md-12 text-center">
                    <img
                      src={item.event_image}
                      class="card-img-top img-fluid"
                      alt="card-image"
                      id="event_image"
                    />
                    <div class="card-body">
                      <h4 class="card-title">{item.event_name}</h4>
                      <p class="card-text">{item.event_description}</p>
                      <a class="link-primary" href="#">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
