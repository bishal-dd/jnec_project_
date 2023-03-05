/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./EventPageComp.css";

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
      <div className="container">
        <div className="row mt-5">
          {event.map((item) => {
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
      </div>
    </>
  );
}
