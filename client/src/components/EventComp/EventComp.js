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
      console.log(response.data);
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
      <div id="event-page" class="py-3">
        <div class="container">
          <div className="row ">
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
                    <div className="card-body d-flex">
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
                        {showFullDescription
                          ? longDescription
                          : shortDescription}
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
            <div className="row">
              <div>
                <Link to="/events" id="view_link" className="link-dark">
                  View-all--
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
