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
  const [showFullDescriptions, setShowFullDescriptions] = useState([]);

  const toggleShowFullDescription = (index) => {
    setShowFullDescriptions((prev) => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          {event.map((item, index) => {
            const maxLength = 150;
            const shortDescription = item.event_description.substring(
              0,
              maxLength
            );
            const longDescription = item.event_description;
            const showButton = item.event_description.length > maxLength;
            const showFullDescription = showFullDescriptions[index] || false;

            return (
              <div className="col mt-3" key={item.id}>
                <div className="card rounded-4">
                  <img
                    className="card-img-top"
                    src={item.event_image}
                    alt="Card image cap"
                    height="200"
                  />
                  <div className="card-body d-flex justify-content-between">
                    <h5 className="card-title">{item.event_name}</h5>
                  </div>
                  <div className="card-body d-flex justify-content-between">
                    {item.event_link !== "" ? (
                      <a
                        href={item.event_link}
                        class="link-dark text-decoration-none"
                        target="_blank"
                        rel="noreferrer"
                      >
                        More info
                      </a>
                    ) : (
                      ""
                    )}
                    <span className="">{item.event_date}</span>
                  </div>

                  <div className="card-body">
                    <p className="card-text">
                      {showFullDescription ? longDescription : shortDescription}
                      {showButton && (
                        <a
                          className="link-primary"
                          onClick={() => toggleShowFullDescription(index)}
                        >
                          {showFullDescription ? "Read less" : "Read more"}
                        </a>
                      )}
                    </p>
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
