import React from "react";
import { Carousel } from "react-bootstrap";
import "./carouselcomp.css";

export default function CarouselComp() {
  const images = [
    {
      url: "https://image-processor-storage.s3.us-west-2.amazonaws.com/images/3cf61c1011912a2173ea4dfa260f1108/halo-of-neon-ring-illuminated-in-the-stunning-landscape-of-yosemite.jpg",
      caption: "Some Text should be put here",
    },
    {
      url: "https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?b=1&k=20&m=517188688&s=612x612&w=0&h=x8h70-SXuizg3dcqN4oVe9idppdt8FUVeBFemfaMU7w=",
      caption: "Some Text should be put here",
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
