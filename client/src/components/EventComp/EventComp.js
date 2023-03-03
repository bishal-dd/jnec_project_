/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./eventcomp.css";
import { toast } from "react-toastify";
import axios from "axios";

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
    </>
  );
}
