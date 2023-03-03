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
    <>
      <div class="container-xxl">
        <div class="row mt-4" id="mainrow">
          {event.map((item, index) => {
            return (
              <div class="col mt-5" key={item.id}>
                <div class="card">
                  <img
                    src={item.event_image}
                    class="card-img-top img-fluid w-100 h-100"
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
            );
          })}
        </div>
      </div>
    </>
  );
}
