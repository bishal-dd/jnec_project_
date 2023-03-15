import React from "react";
import "./projectcomp.css";

export default function ProjectComp() {
  return (
    <div className="project-info">
      <h1 className="project-title mt-3">
        <b>
          Strengthening Capacity of Higher Engineering Education for Sustainable
          Buildings (HEESeB)
        </b>
      </h1>
      <p className="project-details mt-5">
        Jigme Namgyel Engineering College in collaboration with Innsbruck
        University, Austria has been awarded APPEAR (Austrian Partnership
        Programme in Higher Education and Research for Development) project in
        its ninth call for Academic partnership. APPEAR is a programme of the
        Austrian Development Cooperation (ADC) with the aim to implement its
        strategy for support of higher education and research for development on
        an academic institutional level in the ADC’s priority countries and key
        regions European Union Grant (Erasmus+) for a project titled
        “Strengthening problem-based learning in South Asian Universities” (PBL
        South Asia). The project is being coordinated by JNEC.
      </p>
      <p className="project-objectives mt-3">
        <b className="text-dark">Partners:</b> Jigme Namgyel Engineering College
        (JNEC-RUB), Royal University of Bhutan, BHUTAN and University of
        Innsbruck (UBIK), AUSTRIA
      </p>
      <p className="project-details">
        <i>
          <b className="text-dark">
            Project Duration: 1st February 2023 – 31st January 2026
          </b>
        </i>
      </p>
      <p className="project-objectives mt-3 ">
        <b className="text-dark">Project objectives: </b>
      </p>
      <ol className="project-objectives">
        <li>
          Develop new academic programme on timber engineering for energy
          efficient buildings leading to an award of “Certificate in Timber
          Engineering for Energy Efficient Buildings” including associated
          laboratory
        </li>
        <li>
          Develop two new courses at JNEC: Gender, equity and diversity
          sensitive science, technology, engineering and mathematics (STEM);
          Building modelling and simulation, and HVAC
        </li>
        <li>Enhance teaching and research capacity of JNEC</li>
        <li>Improve Instructional Support Services at JNEC</li>
        <li>Internationalise UIBK</li>
      </ol>
    </div>
  );
}
