import React, { useEffect, useState } from "react";
import "./Slider.scss";
function Slider({ sliderContent }) {
  const [activeSlide, setActiveSlide] = useState(1);
  useEffect(() => {
    showSlides(activeSlide);
  }, [activeSlide]);
  const showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("slider__block");
    let dots = document.getElementsByClassName("slider__dot");
    if (n > slides.length) {
      n = 1;
    }
    if (n < 1) {
      n = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[n - 1].style.display = "block";
    dots[n - 1].className += " active";
    setActiveSlide(n);
  };
  const changeSlide = (n) => {
    setActiveSlide((prev) => prev + n);
  };

  return (
    <section className="slider__container">
      <div className="slider__body">
        {sliderContent.map((i) => (
          <div className="slider__block" key={i.id}>
            <img src={i.bannerImageUrl} alt={i.bannerImageAlt} />
          </div>
        ))}
        <button className="slider__prevBtn" onClick={() => changeSlide(-1)}>
          ❮
        </button>
        <button className="slider__nextBtn" onClick={() => changeSlide(1)}>
          ❯
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        {sliderContent.map((k) => (
          <span
            key={k.id}
            className="slider__dot"
            onClick={() => setActiveSlide(k.order)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Slider;
