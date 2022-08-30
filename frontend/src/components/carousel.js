import React from "react";

export default function Carousel() {
  return (
    <>
      <div
        id="carouselExampleSlidesOnly"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src="360_F_235248516_fd01wWZfv0ASe7XBsx2vot2wGXUtcNN8.jpg"
              alt="First slide"
              style={{ height: "70vh" }}
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="concept-of-shopping-online-with-smart-phone-on-blue-sky-background-vector.jpg"
              alt="Second slide"
              style={{ height: "70vh" }}
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="pngtree-simple-atmosphere-online-shopping-hand-closeup-background-poster-image_261322.jpg"
              alt="Third slide"
              style={{ height: "70vh" }}
            />
          </div> 
        </div>
      </div>
    </>
  );
}
