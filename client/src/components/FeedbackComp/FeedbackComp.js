import React, { useState, useEffect } from "react";
import "./feedbackcomp.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function FeedbackComp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [displayedDownloads, setDisplayedDownloads] = useState(5);
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/download").then((response) => {
      console.log(response.data);
      setDownloads(response.data);
    });
  }, []);

  const handleDownload = (downloadUrl, filename) => {
    console.log("Download URL:", downloadUrl);
    axios({
      url: downloadUrl,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename + ".pdf");
      document.body.appendChild(link);
      link.click();
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
  const handleSeeMore = () => {
    setDisplayedDownloads(displayedDownloads + 5);
  };

  return (
    <>
      <section id="get-started" class="get-started section-bg">
        <div class="container-fluid p-4 h-100" id="container_for_feedback">
          <div class="row justify-content-center  gy-4">
            <div className="col">
              <h3 className="text-center">Downloads</h3>
              <ul>
                {downloads.slice(0, displayedDownloads).map((item) => {
                  return (
                    <li key={item.id}>
                      <button
                        className="link-dark border border-0"
                        onClick={() =>
                          handleDownload(item.file_data, item.file_name)
                        }
                      >
                        {item.file_name}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {displayedDownloads < downloads.length && (
                <button onClick={handleSeeMore}>See more</button>
              )}
            </div>
            <div
              class="col-lg-5 p-3  rounded-4 "
              data-aos="fade"
              id="container_for_the_form"
            >
              <form
                method="post"
                class="php-email-form "
                onSubmit={handleSubmit}
              >
                <h3>Feedback</h3>

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
