import React, { useState, useEffect } from "react";
import "./feedbackcomp.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function FeedbackComp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/download").then((response) => {
      setDownloads(response.data);
    });
  }, []);

  const handleDownload = (fileName) => {
    axios({
      url: `http://localhost:3001/api/downloadfile/${fileName}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        console.log(response.data);
        const fileData = new Blob([response.data], {
          type: "application/pdf",
        });
        console.log(fileData);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(fileData);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error downloading file");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/feedback", {
        name,
        email,
        phone,
        message,
      })
      .then((response) => {
        toast.success(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error submitting feedback");
      });
  };

  return (
    <>
      <section id="get-started" class="get-started section-bg">
        <div class="container-fluid p-4 h-100" id="container_for_feedback">
          <div class="row justify-content-center p-5 gy-4">
            <div className="col-5" id="container_for_the_downloads">
              <div className="col-md-9 rounded-4" id="div_for_downloads">
                <h3 className=" text-center">Downloads</h3>
                <ul className=" mt-3">
                  {downloads.slice(0, 13).map((item) => {
                    console.log(item.fileName);
                    return (
                      <li class="text-wrap w-100" key={item.id}>
                        <p
                          className="link-dark border border-0 text-wrap"
                          onClick={() => handleDownload(item.file_name)}
                          id="download_list"
                        >
                          {item.file_name}
                        </p>
                      </li>
                    );
                  })}
                </ul>

                <div>
                  <Link
                    to="/downloads"
                    className="link-primary border border-0"
                  >
                    See more
                  </Link>
                </div>
              </div>
            </div>
            <div
              class="col-md-3 p-3 text-center justify-content-center  rounded-4 "
              data-aos="fade"
              id="container_for_the_form"
            >
              <form
                method="post"
                class="php-email-form "
                onSubmit={handleSubmit}
              >
                <h3 className="texr-center">Feedback</h3>

                <div class="row gy-3">
                  <div class="col-md-10">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div class="col-md-10 ">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div class="col-md-10">
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      placeholder="Phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div class="col-md-10 justify-content-center">
                    <textarea
                      class="form-control"
                      name="message"
                      rows="2"
                      placeholder="Message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <div class="col-md-10 text-center">
                    <button type="submit" class="btn" id="sent_feedback_button">
                      Sent
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
