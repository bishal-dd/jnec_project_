import React from "react";
import CarouselComp from "../CarouselComp/CarouselComp";
import FeedbackComp from "../FeedbackComp/FeedbackComp";
import EventComp from "../EventComp/EventComp";
import FooterComp from "../FooterComp/FooterComp";
import ProjectComp from "../ProjectComp/ProjectComp";

export default function HomeComp() {
  return (
    <div>
      <CarouselComp />
      <ProjectComp/>
      <EventComp />
      <FeedbackComp />
      <FooterComp />
    </div>
  );
}
