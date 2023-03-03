import React from "react";
import CarouselComp from "../CarouselComp/CarouselComp";
import FeedbackComp from "../FeedbackComp/FeedbackComp";
import EventComp from "../EventComp/EventComp";
import FooterComp from "../FooterComp/FooterComp";

export default function HomeComp() {
  return (
    <div>
      <CarouselComp />
      <EventComp />
      <FeedbackComp />
      <FooterComp />
    </div>
  );
}
