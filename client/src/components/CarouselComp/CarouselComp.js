import React from "react";
import { Carousel } from "react-bootstrap";
import "./carouselcomp.css";
import Admin from "../../assets/Admin block.jpeg"
import Campus from "../../assets/JNEC campus.jpeg"

export default function CarouselComp() {
  const images = [
    {
      url: Admin,
      caption: ""
    },
    {
      url: Campus,
      caption: "",
    },
    {
      url: "https://img.freepik.com/free-photo/abstract-flowing-neon-wave-background_53876-101942.jpg",
      caption: "Some Text should be put here",
    },
  ];
  return (
    <>
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block img-fluid w-100"
              height="40"
              src={image.url}
              alt={`Slide ${index}`}
              style={{ objectFit: "cover", height: "510px" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 id="caption_of_the_image">{image.caption}</h5>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
