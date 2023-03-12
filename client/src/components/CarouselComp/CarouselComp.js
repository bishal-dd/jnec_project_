import React from "react";
import { Carousel } from "react-bootstrap";
import "./carouselcomp.css";

export default function CarouselComp() {
  const images = [
    {
      url: "https://res.cloudinary.com/dnmtsuwhc/image/upload/v1678528593/civ8omb3lzuegnsfanjc.jpg",
      caption: "",
    },
    {
      url: "https://res.cloudinary.com/dnmtsuwhc/image/upload/v1678528548/dif4hj25lduvfo3z1mfw.jpg",
      caption: "",
    },
    {
      url: "https://res.cloudinary.com/dnmtsuwhc/image/upload/v1678646008/x4nrsge28pzrceclgixi.jpg",
      caption: "",
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
