/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
//import  Image  from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "./footercomp.css";

export default function FooterComp() {
  return (
    <footer id="main-footer" class="bg-dark">
      <div class="container">
        <div class="row ">
          <div class="col-md-3 mx-auto">
            <ul class="list-unstyled">
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
              <li>
                <Link to="/adminlogin" className="text-dark">
                  admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
