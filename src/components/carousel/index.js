import React from "react";
import "./Carousel.scss";
function Carousel({ carouselContent }) {
  return (
    <section className="carousel__container">
      <ol className="carousel__body">
        {carouselContent.length > 0 &&
          carouselContent.map((item) => (
            <li className="carousel__item" key={item.id} id={item.id}>
              <img src={item.bannerImageUrl} alt={item.bannerImageAlt} />
            </li>
          ))}
      </ol>
      <div className="carousel__btn__container">
        {carouselContent.length > 0 &&
          carouselContent.map((item) => (
            <button  key={item.id}>
              <a href={`#${item.id}`} ></a>
            </button>
          ))}
      </div>
    </section>
  );
}

export default Carousel;
