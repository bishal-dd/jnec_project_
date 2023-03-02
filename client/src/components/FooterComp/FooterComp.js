/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
//import  Image  from 'react-bootstrap';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGoogle,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import "./footercomp.css";

export default function FooterComp() {
  return (
    <footer id="main-footer" class="bg-dark">
      <div class="container">
        <div class="row">
          <div class="col">
            <ul class="list-unstyled">
              Quick Contact:
              <li class="link">
                <a href="#">
                  <FaGoogle />
                </a>
                <br></br>
                <a href="#">
                  <FaFacebook />
                </a>
                <br></br>
                <a href="#">
                  <FaInstagram />
                </a>
                <br></br>
                <a href="#">
                  <FaTwitter />
                </a>
              </li>
            </ul>
          </div>
          <div class="col">
            <ul class="list-unstyled text-left">
              Quick Links
              <li class="link">
                <a href="#">Blog</a>
                <br></br>
                <a href="#">Media</a>
                <br></br>
                <a href="#">Recognitions</a>
                <br></br>
                <a href="#">Our Services</a>
                <br></br>
                <a href="#">Partner & Sponsors</a>
              </li>
            </ul>
          </div>
          <div class="col">
            <ul class="list-unstyled text-left">
              Contact Details<br></br>
              <li class="link">
                <a href="#">
                  <FaWhatsapp /> (+975)-17827589/77278189
                </a>
                <br></br>
                <br></br>
                <a href="#">
                  <FaEnvelope /> Example@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
