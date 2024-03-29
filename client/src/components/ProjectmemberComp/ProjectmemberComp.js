import React from "react";
import "./projectmembercomp.css";

export default function ProjectmemberComp() {
  return (
    <div className="container mt-5 ">
      <h2 className="text-center mb-5">Project Members</h2>

      <div className="row mt-4 justify-content-center" id="aboutus_row">
        <div className="col-md-6">
          <h4>JNEC</h4>
          <ol className="">
            <li>
              <strong>Dr Tshewang Lhendup</strong> – Project Adviser
            </li>
            <li>
              <strong>Mr Samten Lhendup</strong> – Project Manager/Coordinator
            </li>
            <li>
              <strong>Mr Rigden Yoezer Tenzin</strong> – Project
              Member/Secretary
            </li>
            <li>
              <strong>Ms Wangmo</strong> – Member
            </li>
            <li>
              <strong>Mr Lobzang Dorji</strong> – Member
            </li>
            <li>
              <strong>Ms Thinley Wangmo</strong> – Member
            </li>
            <li>
              <strong>Mr Phurba Tamang</strong> – Member
            </li>
            <li>
              <strong>Ms Yeshey Dema</strong> – Project Accountant
            </li>
          </ol>
        </div>

        <div className="col-md-6">
          <h4>UIBK</h4>
          <ol className="list">
            <li>
              <strong>Prof. Wolfgang Streicher</strong> – Partner Coordinator
            </li>
            <li>
              <strong>Prof. Suzanne Kapelari</strong> – Member
            </li>
            <li>
              <strong>Prof. Anton Kraler</strong> – Member
            </li>
            <li>
              <strong>Prof. Roland Maderebner</strong> – Member
            </li>
            <li>
              <strong>Dr Martin Hauer</strong> - Member
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
