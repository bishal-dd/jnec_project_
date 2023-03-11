import React, { useState } from "react";
import "./feedbackcomp.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function FeedbackComp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

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
        <div class="container-fluid p-4" id="container_for_feedback">
          <div class="row justify-content-center  gy-4">
            <div className="col">
              <h3 className="text-center">Downloads</h3>
              <ul>
                <li>
                  <a
                    href="https://res.cloudinary.com/dnmtsuwhc/image/upload/v1678540559/p9dxxswqu8bzpmwqhjru.pdf"
                    download
                  >
                    Test
                  </a>
                </li>
              </ul>
            </div>
            <div
              class="col-lg-5 p-5  rounded-4 h-50"
              data-aos="fade"
              id="container_for_the_form"
            >
              <form
                method="post"
                class="php-email-form "
                onSubmit={handleSubmit}
              >
                <h3>Feedback</h3>
                <p>
                  Vel nobis odio laboriosam et hic voluptatem. Inventore vitae
                  totam. Rerum repellendus enim linead sero park flows.
                </p>
                <div class="row gy-3">
                  <div class="col-md-12">
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

                  <div class="col-md-12 ">
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

                  <div class="col-md-12">
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

                  <div class="col-md-12">
                    <textarea
                      class="form-control"
                      name="message"
                      rows="6"
                      placeholder="Message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <div class="col-md-12 text-center">
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
