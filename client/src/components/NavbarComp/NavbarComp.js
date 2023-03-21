/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./navbarcomp.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import uni_logo from "../../assets/uni_logo.jpeg";

export default function NavbarComp() {
  return (
    <>
      <nav class="navbar fixed-top navbar-expand-xl" id="navbar">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <img
            src={logo}
            width="50"
            class="rounded-2"
            height="50"
            alt="logo"
            id="logo_image"
          />

          <div
            class="collapse navbar-collapse justify-content-center text-center"
            id="navbarTogglerDemo03"
          >
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  to="/"
                  class="nav-link active rounded-5"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active rounded-5"
                  aria-current="page"
                  to="/aboutus"
                >
                  About Us
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active rounded-5"
                  aria-current="page"
                  to="/events"
                >
                  Events
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link active rounded-5"
                  aria-current="page"
                  to="/projectmembers"
                >
                  Project Members
                </Link>
              </li>
            </ul>
          </div>
          <img
            src="https://res.cloudinary.com/dnmtsuwhc/image/upload/v1678645849/u5ffbzghsirppkrzughq.png"
            width="50"
            class="rounded-2"
            height="40"
            alt="logo"
            id="logo_image"
          />
          <img
            src={uni_logo}
            width="50"
            class="rounded-2"
            height="40"
            alt="logo"
            id="logo_image"
          />
        </div>
      </nav>
    </>
  );
}
